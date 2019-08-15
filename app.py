from flask import Flask, redirect, url_for, render_template, request, flash
import models as db_handler
import json
import binance_api
from flask import Response

# Flask
app = Flask(__name__)


@app.route("/")
def index():
    '''
    Home page
    '''
    return redirect(url_for('news'))

@app.route("/index")
def tst():
    '''
    tst page
   '''
    btc = binance_api.btcusd
    return render_template('web/index.html', btc=btc)


@app.route("/main")
def view():
    '''
    Show alls comments
    '''
    btc = binance_api.btcusd
    return render_template('web/main.html', btc=btc)

@app.route("/news")
def news():
    '''
    Show alls rss nrws
    '''

    return render_template('web/news.html')



if __name__ == "__main__":
    app.run()
