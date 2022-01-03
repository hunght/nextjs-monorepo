/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosError, AxiosInstance } from 'axios';
import Axios from 'axios';
import qs from 'qs';

import { sign } from './lib/crypto';
import type { Order } from './types/generated-types';
import { Convert } from './types/generated-types';
import type {
  APIOptions,
  BotsParams,
  BotsStatsParams,
  CurrencyParams,
  DealsParams,
  FundParams,
  MarketCurrencyParams,
  SmartTradeHistoryParams,
  SmartTradeParams,
  ThreeCommasError,
  TransferHistoryParams,
  TransferParams,
} from './types/types';

const ENDPOINT = 'https://api.3commas.io';
const V1 = '/public/api/ver1';
const V2 = '/public/api/v2';

export class ThreeCommasAPI {
  private readonly KEY: string;
  private readonly SECRETS: string;
  private readonly errorHandler?: (
    response: ThreeCommasError,
    reject: (reason?: any) => void
  ) => void | Promise<any>;
  private axios: AxiosInstance;
  private ws?: WebSocket;

  constructor(options?: APIOptions) {
    this.KEY = options?.key ?? '';
    this.SECRETS = options?.secrets ?? '';
    this.errorHandler = options?.errorHandler;
    this.axios = Axios.create({
      baseURL: ENDPOINT,
      timeout: options?.timeout ?? 30000,
      headers: {
        APIKEY: this.KEY,
        ...(options?.forcedMode && { 'Forced-Mode': options?.forcedMode }),
      },
    });
    this.axios.interceptors.request.use(
      (config) => {
        let data = {
          ...config.data,
          api_key: this.KEY,
          secret: this.SECRETS,
        };
        let payload = JSON.stringify(data);

        if (config.method === 'get') {
          payload = qs.stringify(config.params);
          data = null;
        }

        const relativeUrl = config.url?.replace(config.baseURL ?? '', '') ?? '';
        const signature = this.SECRETS
          ? sign(this.SECRETS, relativeUrl, payload)
          : '';
        return {
          ...config,
          data,
          headers: {
            ...config.headers,
            signature,
          },
        };
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }

  private request(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    version: 1 | 2,
    path: string,
    payload?: any
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { data } = await this.axios({
          method,
          url: `${ENDPOINT}${version === 1 ? V1 : V2}${path}`,
          params: method === 'GET' ? payload : undefined,
          data: method !== 'GET' ? payload : undefined,
        });
        resolve(data);
      } catch (e) {
        const error = e as AxiosError<ThreeCommasError>;
        if (error.response?.data && this.errorHandler) {
          await this.errorHandler(error.response.data, reject);
        }
        reject(error.response?.data ?? error);
      }
    });
  }

  async ping() {
    return await this.request('GET', 1, '/ping');
  }

  async time() {
    return await this.request('GET', 1, '/time');
  }

  async transfer(params: TransferParams) {
    return await this.request('POST', 1, '/accounts/transfer', params);
  }

  async getTransferHistory(params: TransferHistoryParams) {
    return await this.request('GET', 1, '/accounts/transfer_history', params);
  }
  async updateBot({
    bot,
    bot_id,
  }: {
    bot: Record<string, unknown>;
    bot_id: number;
  }) {
    return await this.request('PATCH', 1, `/bots/${bot_id}/update`, { ...bot });
  }

  async getTransferData() {
    return await this.request('GET', 1, '/accounts/transfer_data');
  }

  async addExchangeAccount(params: any) {
    return await this.request('POST', 1, '/accounts/new', params);
  }

  async editExchangeAccount(params: any) {
    return await this.request('POST', 1, '/accounts/update', params);
  }

  async getExchange() {
    return await this.request('GET', 1, '/accounts');
  }

  async getMarketList() {
    return await this.request('GET', 1, '/accounts/market_list');
  }

  async getMarketPairs(params?: { market_code: string }): Promise<string[]> {
    return await this.request('GET', 1, '/accounts/market_pairs', params);
  }

  async getCurrencyRate(params: CurrencyParams) {
    return await this.request('GET', 1, '/accounts/currency_rates', params);
  }

  async getCurrencyRateWithLeverageData(params: MarketCurrencyParams) {
    return await this.request(
      'GET',
      1,
      '/accounts/currency_rates_with_leverage_data',
      params
    );
  }

  async getActiveTradeEntities(account_id: number | string) {
    return await this.request(
      'GET',
      1,
      `/accounts/${account_id}/active_trading_entities`
    );
  }

  async sellAllToUSD(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/sell_all_to_usd`
    );
  }

  async sellAllToBTC(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/sell_all_to_btc`
    );
  }

  async getBalanceChartData(account_id: number | string, params: any) {
    return await this.request(
      'GET',
      1,
      `/accounts/${account_id}/balance_chart_data`,
      params
    );
  }

  async loadBalances(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/load_balances`
    );
  }

  async renameExchangeAccount(account_id: number | string, name: string) {
    return await this.request('POST', 1, `/accounts/${account_id}/rename`, {
      name,
    });
  }

  async removeExchangeAccount(account_id: number | string) {
    return await this.request('POST', 1, `/accounts/${account_id}/remove`);
  }

  async getPieChartData(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/pie_chart_data`
    );
  }

  async getAccountTableData(account_id: number | string) {
    return await this.request(
      'POST',
      1,
      `/accounts/${account_id}/account_table_data`
    );
  }

  async getAccountInfo(account_id?: number) {
    return await this.request('GET', 1, `/accounts/${account_id ?? 'summary'}`);
  }

  async getLeverageData(account_id: number | string, pair: string) {
    return await this.request(
      'GET',
      1,
      `/accounts/${account_id}/leverage_data`,
      { pair }
    );
  }

  async changeUserMode(mode: 'paper' | 'real') {
    return await this.request('POST', 1, '/users/change_mode', { mode });
  }

  async getSmartTradeHistory(
    params?: SmartTradeHistoryParams
  ): Promise<Order[]> {
    return await this.request('GET', 2, '/smart_trades', params);
  }

  async smartTrade(params: SmartTradeParams): Promise<Order> {
    return await this.request('POST', 2, '/smart_trades', params);
  }

  async getSmartTrade(id: number): Promise<Order> {
    return await this.request('GET', 2, `/smart_trades/${id}`);
  }

  async cancelSmartTrade(id: number): Promise<Order> {
    return await this.request('DELETE', 2, `/smart_trades/${id}`);
  }

  async updateSmartTrade(id: number, params: any): Promise<Order> {
    return await this.request('PATCH', 2, `/smart_trades/${id}`, params);
  }

  async averageSmartTrade(id: number, params: FundParams): Promise<Order> {
    return await this.request(
      'POST',
      2,
      `/smart_trades/${id}/add_funds`,
      params
    );
  }

  async reduceFund(id: number, params: FundParams): Promise<Order> {
    return await this.request(
      'POST',
      2,
      `/smart_trades/${id}/reduce_funds`,
      params
    );
  }

  async closeSmartTrade(id: number): Promise<Order> {
    return await this.request('POST', 2, `/smart_trades/${id}/close_by_market`);
  }

  async forceStartSmartTrade(id: number): Promise<Order> {
    return await this.request('POST', 2, `/smart_trades/${id}/force_start`);
  }

  async forceProcessSmartTrade(id: number): Promise<Order> {
    return await this.request('POST', 2, `/smart_trades/${id}/force_process`);
  }

  async setNoteSmartTrade(id: number, note: string): Promise<Order> {
    return await this.request('POST', 2, `/smart_trades/${id}/set_note`, {
      note,
    });
  }

  /**
   * Get the sub trades of a smart trade, including entry and take profit orders.
   *
   * @param id smart trade id
   * @returns SmartTrade Order
   */
  async getSubTrade(id: number) {
    return await this.request('GET', 2, `/smart_trades/${id}/trades`);
  }

  async closeSubTrade(smartTradeId: number, subTradeId: number) {
    return await this.request(
      'POST',
      2,
      `/smart_trades/${smartTradeId}/trades/${subTradeId}/close_by_market`
    );
  }

  async cancelSubTrade(smartTradeId: number, subTradeId: number) {
    return await this.request(
      'DELETE',
      2,
      `/smart_trades/${smartTradeId}/trades/${subTradeId}`
    );
  }

  async getBots(
    params: BotsParams = {
      limit: 50,
      sort_by: 'created_at',
      sort_direction: 'desc',
    }
  ) {
    return await this.request('GET', 1, '/bots', params);
  }

  async getBotsStats(params?: BotsStatsParams) {
    return await this.request('GET', 1, '/bots/stats', params);
  }

  async getBot(id: number) {
    return await this.request('GET', 1, `/bots/${id}/show`);
  }

  async getDeals(
    params: DealsParams = {
      limit: 50,
      order: 'created_at',
      order_direction: 'desc',
    }
  ) {
    return await this.request('GET', 1, '/deals', params);
  }

  async getDeal(id: number) {
    return await this.request('GET', 1, `/deals/${id}/show`);
  }

  async getDealSafetyOrders(id: number) {
    return await this.request('GET', 1, `/deals/${id}/market_orders`);
  }

  async customRequest(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
    version: 1 | 2,
    path: string,
    payload?: any
  ) {
    return await this.request(method, version, path, payload);
  }

  /**
   * Validate the response order is consistent with the generated type
   * Or, an error is thrown
   *
   * @param order order
   */
  validateOrderType(order: Order) {
    return Convert.toOrder(JSON.stringify(order));
  }
}
