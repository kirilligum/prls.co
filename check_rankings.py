import os
import sys
import asyncio
# Add the mcp-gsc directory to path
sys.path.append("/home/kirill/prls.co/mcp-gsc")

from gsc_server import get_search_analytics

# Set credentials env var
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/home/kirill/.config/gcloud/application_default_credentials.json"
os.environ["GSC_SKIP_OAUTH"] = "true"

SITE_URL = "sc-domain:prls.co"

async def main():
    print(f"--- Checking rankings for specific queries ---")
    
    # Check "atmo ai"
    print("\nDetailed data for 'atmo ai':")
    try:
        # filter by query
        analytics = await get_search_analytics(SITE_URL, days=90, dimensions="query,page")
        lines = analytics.split("\n")
        header = lines[4] # Header line
        print(header)
        for line in lines[6:]:
            if "atmo ai" in line.lower():
                print(line)
    except Exception as e:
        print(f"Error: {e}")

    # Check "powerup energy"
    print("\nDetailed data for 'powerup energy':")
    try:
        for line in lines[6:]:
            if "powerup energy" in line.lower():
                print(line)
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    asyncio.run(main())

