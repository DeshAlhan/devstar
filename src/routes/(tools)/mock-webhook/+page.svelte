<!-- src/routes/+page.svelte -->
<script>
    let responseText = '';

    async function sendTestWebhook() {
        try {
            const res = await fetch('/api/v1/in/e_DCFOA2693TG8wtcRLDaD8aFOm3J/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    test: 'This is a test webhook. Welcome to Devstar',
                    "id": "2OCKDinjlW99HqGR6NwpsR9y9wg",
                    "headers": {
                        "accept": "*/*",
                        "content-length": "51",
                        "svix-timestamp": "1681059005",
                        "svix-signature": "v1,rBo5L4TbF2dNUsWTVMDkMHUo64MK4cnQXhGS2+2CKMM=",
                        "content-type": "application/json",
                        "user-agent": "Svix-Webhooks/1.4.1",
                        "svix-id": "msg_2OCKDhQhjwh011nllvHbNAseurs"
                    }
                })
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            try {
                const response = await res.json();
                responseText = JSON.stringify(response, null, 2);
            } catch (err) {
                responseText = 'Failed to parse JSON response';
            }
        } catch (err) {
            responseText = `Error: ${err.message}`;
        }
    }
</script>

<main>
    <h1 class="text-white m-2 p-1 font-extrabold">Webhook Tester</h1>
    <p class="text-white font-semibold m-5 p-2">Press the button below to send a webhook request to our site and test it</p>
    <button class="font-medium bg-red-500 text-white m-10 rounded-lg h-11 p-3" on:click={sendTestWebhook}>Send Test Webhook</button>
    <textarea readonly rows="10" cols="50" bind:value={responseText}></textarea>
    <p class="text-white font-semibold m-5 p-2">Easily inspect, test, and debug incoming webhooks with the DEVSTAR MOCK-WEBHOOK tool for webhook testing & debugging.</p>
</main>

<style>
    main {
        text-align: center;
        padding: 2rem;
    }

    textarea {
        width: 100%;
        height: 200px;
        margin-top: 1rem;
        padding: 1rem;
        font-family: monospace;
        white-space: pre-wrap;
    }
</style>
