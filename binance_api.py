import  requests

url = 'https://blockchain.info/ru/ticker'
a = requests.get(url)
ans = a.json()

print(type(ans.get('USD')))

usd = ans.get('USD')

print(usd.get('last'))

btcusd = int(usd.get('last'))

#
# def get_all_fake_todos(self):
#     request = requests.get(url='https://reqres.in/api/users?page=2')
#     if request.status_code != 200:
#         raise ExpectedStatusCodeError
#     return request.json()