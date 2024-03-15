const namespaces = ["Ethiopia/BPO","Ethiopia/individual_company","Ethiopia/international_company","Ethiopia/local_agency"];

// a reusable producer creator function
const createProducer = async (namespace, client, topic) => {
  return client.createProducer({
        topic: `persistent://${namespace}/${topic}`,
        producerName: namespace.split('/')[1].toString(),
        })
}

module.exports = createTopics


     