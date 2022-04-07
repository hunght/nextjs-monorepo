export type TradingBot3Commas = {
  id: number; //8440128,
  account_id: number; //31253357,
  is_enabled: boolean; //false,
  max_safety_orders: number; //25,
  active_safety_orders_count: number; //1,
  pairs: string[];
  strategy_list: any;
  max_active_deals: number; //4;
  active_deals_count: number; //4;
  'deletable?': boolean; //false;
  created_at: string; //'2022-03-17T06:23:08.464Z';
  updated_at: string; //'2022-04-06T22:30:50.066Z';
  trailing_enabled: boolean; //true;
  tsl_enabled: boolean; //false;
  deal_start_delay_seconds: string | null; //null;
  stop_loss_timeout_enabled: boolean; //false;
  stop_loss_timeout_in_seconds: number; //0;
  disable_after_deals_count: string | null; //null;
  deals_counter: string | null; //null;
  allowed_deals_on_same_pair: number; //1;
  easy_form_supported: boolean; //false;
  close_deals_timeout: string | null; //null;
  url_secret: string; //'1764b7658a';
  name: string; //'3CQSBOT_MULTI_TA_SAFE';
  take_profit: string; //'1.5';
  base_order_volume: string; //'13.0';
  safety_order_volume: string; //'13.0';
  safety_order_step_percentage: string; //'2.4';
  take_profit_type: string; //'total';
  type: string; //'Bot::MultiBot';
  martingale_volume_coefficient: string; //'1.05';
  martingale_step_coefficient: string; //'1.0';
  stop_loss_percentage: string; //'0.0';
  cooldown: string; //'0';
  btc_price_limit: string; //'0.0';
  strategy: string; //'long';
  min_volume_btc_24h: string; //'100.0';
  profit_currency: string; //'quote_currency';
  min_price: number | null; //null;
  max_price: number | null; //null;
  stop_loss_type: string; //'stop_loss';
  safety_order_volume_type: string; //'quote_currency';
  base_order_volume_type: string; //'quote_currency';
  account_name: string; //'Binance';
  trailing_deviation: string; //'0.2';
  finished_deals_profit_usd: string; //'68.10759913';
  finished_deals_count: string; //'170';
  leverage_type: string; //'not_specified';
  leverage_custom_value: string | null; //null;
  start_order_type: string; //'limit';
  active_deals_usd_profit: string; //'-31.695067375';
};
