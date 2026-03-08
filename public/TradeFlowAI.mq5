//+------------------------------------------------------------------+
//|                                              TradeFlowAI EA      |
//|                                         https://tradeflowai.cloud |
//+------------------------------------------------------------------+
#property copyright "TradeFlow AI"
#property link      "https://tradeflowai.cloud"
#property version   "1.00"

#include <Trade\Trade.mqh>

//--- Input Parameters
input string   WebhookURL    = "https://tradeflow-ai-backend-production.up.railway.app/bot/signal/your-email";
input double   LotSize       = 0.01;
input int      CheckInterval = 5;     // seconds
input bool     EnableTrading = true;
input int      MagicNumber   = 123456;

//--- Global Variables
CTrade trade;
datetime lastCheck = 0;
string lastSignalId = "";

//+------------------------------------------------------------------+
//| Expert initialization                                            |
//+------------------------------------------------------------------+
int OnInit()
{
   trade.SetExpertMagicNumber(MagicNumber);
   
   Print("TradeFlow AI EA Started");
   Print("Webhook: ", WebhookURL);
   
   EventSetTimer(CheckInterval);
   return(INIT_SUCCEEDED);
}

//+------------------------------------------------------------------+
//| Expert deinitialization                                          |
//+------------------------------------------------------------------+
void OnDeinit(const int reason)
{
   EventKillTimer();
   Print("TradeFlow AI EA Stopped");
}

//+------------------------------------------------------------------+
//| Timer function - check for signals                               |
//+------------------------------------------------------------------+
void OnTimer()
{
   if(!EnableTrading) return;
   CheckForSignals();
}

//+------------------------------------------------------------------+
//| Check webhook for new signals                                    |
//+------------------------------------------------------------------+
void CheckForSignals()
{
   string headers = "Content-Type: application/json\r\n";
   string result = "";
   char post[], res[];
   
   string url = WebhookURL + "?last_id=" + lastSignalId;
   
   int res_code = WebRequest("GET", url, headers, 5000, post, res, headers);
   
   if(res_code == 200)
   {
      result = CharArrayToString(res);
      ParseAndExecute(result);
   }
   else if(res_code == 204)
   {
      // No new signals
   }
   else
   {
      Print("Webhook error: ", res_code);
   }
}

//+------------------------------------------------------------------+
//| Parse JSON signal and execute trade                              |
//+------------------------------------------------------------------+
void ParseAndExecute(string json)
{
   // Parse signal_id
   string signal_id = ExtractValue(json, "signal_id");
   if(signal_id == lastSignalId || signal_id == "") return;
   
   string action  = ExtractValue(json, "action");   // BUY or SELL
   string symbol  = ExtractValue(json, "symbol");   // e.g. XAUUSD
   double entry   = StringToDouble(ExtractValue(json, "entry"));
   double sl      = StringToDouble(ExtractValue(json, "sl"));
   double tp      = StringToDouble(ExtractValue(json, "tp"));
   double lot     = StringToDouble(ExtractValue(json, "lot"));
   
   if(lot <= 0) lot = LotSize;
   if(symbol == "") symbol = Symbol();
   
   int digits = (int)SymbolInfoInteger(symbol, SYMBOL_DIGITS);
   double point = SymbolInfoDouble(symbol, SYMBOL_POINT);
   long stopLevelPts = SymbolInfoInteger(symbol, SYMBOL_TRADE_STOPS_LEVEL);
   double minStop = stopLevelPts * point * 2;
   
   double ask = SymbolInfoDouble(symbol, SYMBOL_ASK);
   double bid = SymbolInfoDouble(symbol, SYMBOL_BID);
   
   sl = NormalizeDouble(sl, digits);
   tp = NormalizeDouble(tp, digits);
   
   Print("New Signal: ", action, " ", symbol, " Entry:", entry, " SL:", sl, " TP:", tp, " MinStop:", minStop);
   
   lastSignalId = signal_id;
   
   if(action == "BUY")
   {
      if(sl > 0 && ask - sl < minStop) sl = NormalizeDouble(ask - minStop, digits);
      if(tp > 0 && tp - ask < minStop) tp = NormalizeDouble(ask + minStop, digits);
      trade.Buy(lot, symbol, 0, sl, tp, "TradeFlowAI");
      Print("BUY order placed: ", symbol, " Lot:", lot, " SL:", sl, " TP:", tp);
   }
   else if(action == "SELL")
   {
      if(sl > 0 && sl - bid < minStop) sl = NormalizeDouble(bid + minStop, digits);
      if(tp > 0 && bid - tp < minStop) tp = NormalizeDouble(bid - minStop, digits);
      trade.Sell(lot, symbol, 0, sl, tp, "TradeFlowAI");
      Print("SELL order placed: ", symbol, " Lot:", lot, " SL:", sl, " TP:", tp);
   }
   else if(action == "CLOSE")
   {
      CloseAllPositions(symbol);
   }
}

//+------------------------------------------------------------------+
//| Close all positions for a symbol                                 |
//+------------------------------------------------------------------+
void CloseAllPositions(string symbol)
{
   for(int i = PositionsTotal()-1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      if(PositionSelectByTicket(ticket))
      {
         if(PositionGetString(POSITION_SYMBOL) == symbol && 
            PositionGetInteger(POSITION_MAGIC) == MagicNumber)
         {
            trade.PositionClose(ticket);
            Print("Position closed: ", ticket);
         }
      }
   }
}

//+------------------------------------------------------------------+
//| Extract value from simple JSON                                   |
//+------------------------------------------------------------------+
string ExtractValue(string json, string key)
{
   string search = "\"" + key + "\":";
   int start = StringFind(json, search);
   if(start == -1) return "";
   
   start += StringLen(search);
   
   // Skip spaces
   while(start < StringLen(json) && StringGetCharacter(json, start) == ' ')
      start++;
   
   bool isString = StringGetCharacter(json, start) == '"';
   if(isString) start++;
   
   int end = start;
   while(end < StringLen(json))
   {
      ushort c = StringGetCharacter(json, end);
      if(isString && c == '"') break;
      if(!isString && (c == ',' || c == '}')) break;
      end++;
   }
   
   return StringSubstr(json, start, end - start);
}

//+------------------------------------------------------------------+
//| Chart event                                                      |
//+------------------------------------------------------------------+
void OnChartEvent(const int id, const long& lparam, const double& dparam, const string& sparam)
{
}
