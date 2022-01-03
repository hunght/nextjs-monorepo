import Hex from 'crypto-js/enc-hex';
import HmacSHA256 from 'crypto-js/hmac-sha256';

export function sign(secret: string, url: string, params?: string): string {
  const message = params ? `${url}?${params}` : url;

  return HmacSHA256(message, secret).toString(Hex);
}
