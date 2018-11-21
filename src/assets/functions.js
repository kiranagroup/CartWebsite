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

export const requestCollections = (esClient, index='website', state) =>{
	const body = {
	    size: 0,
		aggs: {
			by_cluster: {
				terms: {
					field: 'Cluster.keyword',
					size: 50,
				},
				aggs: {
					total_hits: {
						top_hits: {size:500}
					},
					by_category: {
						terms:{
							field: 'Category.keyword',
							size: 1000
						},
						aggs: {
							hits:  { top_hits: {size: 250} },
							by_price: {
								percentiles: {
									field: "Price",
									percents: [25,50,75,99.9]
								}
							}
						}
					},
					by_brand: {
						terms:{
							field: 'Brand.keyword',
							size: 1000
						},
						aggs: {
							hits:  { top_hits: {size: 250} },
							by_price: {
								percentiles: {
									field: "Price",
									percents: [25,50,75,99.9]
								}
							}
						}
					},
					by_price: {
						percentiles: {
							field: "Price",
							percents: [25,50,75,99.9]
						}
					}
				}
			}
		}
  	};
	esClient.search({index: index, body: body})
	.then(results => {
  		console.log('After res', results);
    	return results;
    })
    .catch(err => {console.log(err);})
}

export const reqCollectionQueryBody = {
    size: 0,
	aggs: {
		by_cluster: {
			terms: {
				field: 'Cluster.keyword',
				size: 50,
			},
			aggs: {
				total_hits: {
					top_hits: {size:500}
				},
				by_category: {
					terms:{
						field: 'Category.keyword',
						size: 1000
					},
					aggs: {
						hits:  { top_hits: {size: 250} },
						by_price: {
							percentiles: {
								field: "Price",
								percents: [25,50,75,99.9]
							}
						}
					}
				},
				by_brand: {
					terms:{
						field: 'Brand.keyword',
						size: 1000
					},
					aggs: {
						hits:  { top_hits: {size: 250} },
						by_price: {
							percentiles: {
								field: "Price",
								percents: [25,50,75,99.9]
							}
						}
					}
				},
				by_price: {
					percentiles: {
						field: "Price",
						percents: [25,50,75,99.9]
					}
				}
			}
		}
	}
};

export const searchPaneQueryBody = (brands, categories, lowBound=null, highBound=null) => {
	let body;
	if(brands.length && categories.length){
        body = {
            size: 1000,
            query: {
                bool: {
                    must: [
                        {
                            terms: {
                                'Brand.keyword': brands
                            }
                        },
                        {
                            terms:{
                                'Category.keyword': categories
                            }
                        },
                  	 	{
                         "range": {
                            "Price": { "gte" : lowBound, "lte" : highBound }
                          }
                        }
                    ]
                }
            },
            aggs: {
                by_price: {
                    percentiles: {
                        field: "Price",
                        percents: [25,50,75,100]
                    }
                }
            }
        }	
    }
	else if(brands.length){
        body = {
            size: 1000,
            query: {
                bool: {
                    must: [
                        {
                            terms: {
                                'Brand.keyword': brands
                            }
                        },
                       	{
                         "range": {
                            "Price": { "gte" : lowBound, "lte" : highBound }
                          }
                        }
                    ]
                }
            },
            aggs: {
                by_price: {
                    percentiles: {
                        field: "Price",
                        percents: [25,50,75,100]
                    }
                }
            }
        }		
    }
	else if(categories.length){
        body = {
            size: 1000,
            query: {
                bool: {
                    must: [
                        {
                            terms:{
                                'Category.keyword': categories
                            }
                        },
                       {
                         "range": {
                            "Price": { "gte" : lowBound, "lte" : highBound }
                          }
                        }
                    ]
                }
            },
            aggs: {
                by_price: {
                    percentiles: {
                        field: "Price",
                        percents: [25,50,75,100]
                    }
                }
            }
        }		
    }
    else{
        body = {
            size: 1000,
            query: {
                bool: {
                    must: [
                       	{
                         "range": {
                            "Price": { "gte" : lowBound, "lte" : highBound }
                          }
                        }
                    ]
                }
            },
            aggs: {
                by_price: {
                    percentiles: {
                        field: "Price",
                        percents: [25,50,75,100]
                    }
                }
            }
        }
    }

    return body;
}