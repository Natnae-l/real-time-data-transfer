const { Client } = require('pulsar-client');

async function consumeMessages() {
    const client = new Client({
        serviceUrl: process.env.serviceUrl,
    });

    const consumer = await client.subscribe({
        topic: 'persistent://Ethiopia/BPO/job',
        subscriptionType: 'key_shared',
        subscription:'name',
    })

        console.log('Pulsar Consumer is running...');

    while (true) {
        try {
            const message = await consumer.receive();
            console.log(JSON.parse(message.getProperties().key));
                console.log(`Received message: ${message.getData()}`);
                await consumer.acknowledge(message);            
        } catch (error) {
            console.error(`Error while consuming message: ${error.message}`);
        }
    }
}

consumeMessages().catch(console.error);
