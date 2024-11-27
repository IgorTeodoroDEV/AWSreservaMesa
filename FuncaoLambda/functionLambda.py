import json
import boto3
from botocore.exceptions import ClientError

# Inicializando o recurso DynamoDB
dynamodb = boto3.resource('dynamodb')
reservas_table = dynamodb.Table('Reservadas')
comandas_table = dynamodb.Table('Comandas')


def lambda_handler(event, context):
    
    action = event.get('action')
    mesa_id = event.get('mesaID')
    comanda_id = event.get('comandaID')
    
    if not action:
        return {
            'statusCode': 400,
            'body': json.dumps("acao nao fornecida.")
        }

    # Ações para cada operação
    if action == 'reservarMesa':
        return reservar_mesa(mesa_id)
    elif action == 'liberarMesa':
        return liberar_mesa(mesa_id)
    elif action == 'adicionarItem':
        produto = event.get('produto')
        quantidade = event.get('quantidade')
        if not produto or not quantidade:
            return {
                'statusCode': 400,
                'body': json.dumps("Produto ou quantidade não fornecidos.")
            }
        return adicionar_item_comanda(comanda_id, produto, quantidade)
    elif action == 'finalizarComanda':
        return finalizar_comanda(comanda_id)
    elif action == 'consultarReserva':
        return consultar_reserva()
    elif action == 'consultarComanda':
        return consultar_comanda(comanda_id)
    elif action == 'consultarItensComanda':
        return consultar_itens_comanda(comanda_id)
    else:
        return {
            'statusCode': 400,
            'body': json.dumps('acao invalida fornecida.')
        }

def reservar_mesa(mesa_id):
    if not mesa_id:
        return {'statusCode': 400, 'body': json.dumps('Mesa ID não fornecido.')}
    print(f"Tentando reservar a mesa {mesa_id}")
    try:
        reservas_table.put_item(
            Item={
                'mesaID': str(mesa_id),
                'reservada': True
            },
            ConditionExpression="attribute_not_exists(mesaID)"
        )
        return {'statusCode': 200, 'body': json.dumps(f"Mesa {mesa_id} reservada com sucesso.")}

    except ClientError as e:
        error_message = e.response['Error']['Message']
        error_code = e.response['Error']['Code']
        
        # Logs detalhados
        print(f"Erro ao tentar reservar a mesa {mesa_id}: {error_message} (Code: {error_code})")

        if error_code == 'ConditionalCheckFailedException':
            return {'statusCode': 400, 'body': json.dumps(f"Mesa {mesa_id} já está reservada.")}
        return {'statusCode': 500, 'body': json.dumps("Erro ao reservar mesa")}

def liberar_mesa(mesa_id):
    if not mesa_id:
        return {'statusCode': 400, 'body': json.dumps('Mesa ID não fornecido.')}

    try:
        reservas_table.update_item(
            Key={'mesaID': mesa_id},
            UpdateExpression="set reservada = :r",
            ConditionExpression="reservada = :true",
            ExpressionAttributeValues={':r': False, ':true': True}
        )
        return {'statusCode': 200, 'body': json.dumps(f"Mesa {mesa_id} liberada.")}

    except ClientError as e:
        if e.response['Error']['Code'] == 'ConditionalCheckFailedException':
            return {'statusCode': 400, 'body': json.dumps(f"Mesa {mesa_id} não está reservada.")}

        return {'statusCode': 500, 'body': json.dumps("Erro ao liberar mesa.")}

def adicionar_item_comanda(comanda_id, produto, quantidade):
    if not comanda_id or not produto or not quantidade:
        return {'statusCode': 400, 'body': json.dumps('Comanda ID, produto ou quantidade não fornecidos.')}

    try:
        comandas_table.update_item(
            Key={'comandaID': str(comanda_id)},
            UpdateExpression="SET itens = list_append(if_not_exists(itens, :empty_list), :new_item)",
            ExpressionAttributeValues={
                ':new_item': [{'produto': produto, 'quantidade': quantidade}],
                ':empty_list': []
            }
        )
        return {'statusCode': 200, 'body': json.dumps(f"Adicionado {quantidade}x {produto} na comanda {comanda_id}.")}
    
    except ClientError:
        return {'statusCode': 500, 'body': json.dumps("Erro ao adicionar item na comanda.")}

def finalizar_comanda(comanda_id):
    if not comanda_id:
        return {'statusCode': 400, 'body': json.dumps("Comanda ID não fornecido.")}

    try:
        response = comandas_table.get_item(Key={'comandaID': str(comanda_id)})
        if 'Item' not in response:
            return {'statusCode': 400, 'body': json.dumps("Comanda não encontrada.")}

        itens = response['Item'].get('itens', [])
        if not itens:
            return {'statusCode': 400, 'body': json.dumps("Comanda não contém itens.")}

        # Calcular o total convertendo explicitamente para float
        total = sum(
            float(item['quantidade']) * float(get_preco_produto(item['produto'])) 
            for item in itens
        )

        comandas_table.delete_item(Key={'comandaID': comanda_id})
        
        return {
            'statusCode': 200,
            'body': json.dumps(f"Comanda {comanda_id} finalizada.")
        }
    
    except ClientError:
        return {'statusCode': 500, 'body': json.dumps("Erro ao finalizar comanda.")}
    except ValueError as e:
        # Lidar com possíveis erros de conversão
        return {'statusCode': 400, 'body': json.dumps(f"Erro de valor inválido nos itens da comanda: {str(e)}")}

def get_preco_produto(produto):
    # Exemplo de preços
    precos = {'Hamburguer': 15.0, 'Refrigerante': 5.0, 'Pizza': 20.0}
    return precos.get(produto, 0.0)

def consultar_reserva():
    try:
        # Fazer o scan para obter todos os itens da tabela
        response = reservas_table.scan()
        dados = response.get('Items', [])

        # Continuar escaneando se houver mais itens (paginado)
        while 'LastEvaluatedKey' in response:
            response = reservas_table.scan(ExclusiveStartKey=response['LastEvaluatedKey'])
            dados.extend(response.get('Items', []))

        return {
            'statusCode': 200,
            'body': json.dumps(dados)
        }
    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps(f"Erro ao obter dados da tabela Reservada: {str(e)}")
        }

def consultar_itens_comanda(comanda_id):
    if not comanda_id:
        return {'statusCode': 400, 'body': json.dumps("Comanda ID não fornecido.")}

    try:
        response = comandas_table.get_item(Key={'comandaID': str(comanda_id)})
        if 'Item' not in response:
            return {'statusCode': 404, 'body': json.dumps("Comanda não encontrada.")}

        itens = response['Item'].get('itens', [])
        return {
            'statusCode': 200,
            'body': json.dumps({ 'comandaID': comanda_id,'itens': itens})
        }
    
    except ClientError:
        return {'statusCode': 500, 'body': json.dumps("Erro ao consultar itens da comanda.")}