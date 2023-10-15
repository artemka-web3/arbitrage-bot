import asyncio
import aiohttp
import json
import web3

async def fetch_data(url):
    async with aiohttp.ClientSession() as session:
        async with session.get(url) as response:
            if response.status == 200:
                data = await response.text()
                return json.loads(data)
            else:
                return None

async def get_prices_from_pools():
    pantheon_scale = "https://api.geckoterminal.com/api/v2/networks/base/pools/0x1948Bd09a8777023d4F15E29880930eD5bA0Daf2"
    pantheon_usdc = "https://api.geckoterminal.com/api/v2/networks/base/pools/0x36e05b7ad2f93816068c831415560ae872024f27"

    tasks = [fetch_data(pantheon_scale), fetch_data(pantheon_usdc)]
    responses = await asyncio.gather(*tasks)

    if responses[0] is not None and responses[1] is not None:
        data1 = responses[0]
        data2 = responses[1]

        pantheon_price_in_pantheon_scale = data1["data"]["attributes"]["quote_token_price_usd"]
        scale_price_in_pantheon = data1["data"]["attributes"]["base_token_price_quote_token"]
        pantheon_price_in_scale = data1["data"]["attributes"]["quote_token_price_base_token"]

        usdc_price_in_pantheon_usdc = data2["data"]["attributes"]["quote_token_price_usd"]
        pantheon_price_in_pantheon_usdc = data2["data"]["attributes"]["base_token_price_quote_token"]
        pantheon_price_in_usdc = data2["data"]["attributes"]["quote_token_price_base_token"]
        return {
            'PANTHEON / SCALE': {
                'pantheon_price_in_pantheon_scale': pantheon_price_in_pantheon_scale, 
                'scale_price_in_pantheon': scale_price_in_pantheon,
                'pantheon_price_in_scale': pantheon_price_in_scale
            },
            "PANTHEON / USDC": {
                'usdc_price_in_pantheon_usdc': usdc_price_in_pantheon_usdc,
                'pantheon_price_in_pantheon_usdc': pantheon_price_in_pantheon_usdc,
                'pantheon_price_in_usdc': pantheon_price_in_usdc
            }
        }
    else:
        print("Missing data!")
        return None

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(get_prices_from_pools())
