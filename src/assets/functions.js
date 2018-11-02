// Enter all data to firebase
export const enterAllData = (firebase, prods) =>{
	const database = firebase.database();
	prods.forEach((product, i) => {
		const key_ref = database.ref('products').push();
  		key_ref.set(product);
	})
}

// Bulk export using same file
export const bulkIndex = (esClient, index, type, data) => {
	let bulkBody = [];

	data.forEach((item, i) => {
		bulkBody.push({
		  index: {
		    _index: index,
		    _type: type,
		    _id: i
		  }
		});

		bulkBody.push(item);
	});

	esClient.bulk({body: bulkBody})
	.then(response => {
		console.log('Response received');
		let errorCount = 0;
		response.items.forEach(item => {
		  if (item.index && item.index.error) {
		    console.log(++errorCount, item.index.error);
		  }
		});
		console.log(`Successfully indexed ${data.length - errorCount}
		   out of ${data.length} items`
		);
	})
	.catch(console.err);
}

export const searchElastic = (esClient, index, body) =>{
	esClient.search({index: index, body: body})
	.then(results => {
      console.log(`found ${results.hits.total} items in ${results.took}ms`);
      console.log(results);
      console.log(`${body.query.bool.should.multi_match.query} in ${results.hits.hits[0]._source.Brand}`);
      console.log(`${body.query.bool.should.multi_match.query} in ${results.hits.hits[0]._source.Category}`);
      return results;
    })
    .catch(err => {console.log(err);})
}