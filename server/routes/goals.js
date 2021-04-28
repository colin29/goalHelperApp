const { MongoClient } = require("mongodb");

const uri =  "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {useUnifiedTopology: true});


let db;
(async () => {
	await client.connect();
	 db = client.db('goalHelperApp');
	 // getGoalsByUser("107254778077007667014")
})().catch(e => {
    console.log("Couldn't connect to db: ", e)
});


// // Placeholder test data
// const goals = [
// 			makeGoal(1, 'Run 5 times a week', 'foo foo foo'),
// 			makeGoal(2, 'Write blog articles', '2 blog posts per month'),
// 			makeGoal(3, 'Work on app'),
// 		];

// function makeGoal(id, name, desc = '') {
// 		return { id: id, name: name, desc: desc };
// }


const goalRoutes = (app, fs) => {
	
	
	app.get('/api/goals', (req, res)=>{
			console.log("got GET on /goals");
		let userid = req.query.userid;
		console.log("requested goals for user", userid);

		res.setHeader('Content-Type', 'application/json');
		let goals;
		(async () => {
			goals = await getGoalsByUser(userid)
			console.log("Fetched Goals:", goals)
    		res.end(JSON.stringify(goals));
		})()
	});


	/**
		Get all goals
	*/
	// app.get('/api/goals', (req, res) => {
	// 	console.log("got GET on /goals");
	// 	res.setHeader('Content-Type', 'application/json');

	// 	let goals;
	// 	(async () => {
	// 		goals = await getAllGoals();
	// 		console.log(`Fetched Goals: ${goals}`)
	// 		console.log(goals)
 //    		res.end(JSON.stringify(goals));
	// 	})()
	// });

	/**
		Get goal by id
	*/
	app.get('/api/goals/:id', (req, res) => {
		let id = parseInt(req.params.id);
		let goal = null;
		console.log("got GET on /goals id=", id);
		getGoal(id).then(goal=>{
			if(goal){
				res.setHeader('Content-Type', 'application/json');
	    		res.end(JSON.stringify(goal));
			}else{
				res.end(`GET: No goal with id ${id}`);
			}
		}).catch(err=>console.log("Error: " + err));
	});

	/**
		Add a new goal
		Request: Goal must contain name, desc is optional.
	*/
	app.post('/api/goals', (req, res) => {
    	res.write('Reached goals: PUT\n');
    	(async () => {
    		goal = req.body;
    		if(goal){
    			addGoal(req.body)
    			.then(()=>res.end("Added Goal"))
    			.catch((err)=>res.end("Adding goal failed: " + err))
    			
    		}else{
    			res.end('No goal was provided');
    		}
    	})()
	});

	/**
		Request: Only the id in the url is used, if the goal has a _id field it is overwritten.

		Response: True if update was succesful. False most likely indicates goal id wasn't found
	*/
	app.patch('/api/goals/:id', (req, res) => {
		goal = req.body;
		let id = parseInt(req.params.id);
		if(!goal){
			res.end('PATcH: No goal provided')
			return;
		}
		(async () => {
			 const success = await updateGoal(id, goal);
			 res.end(JSON.stringify(success));
		})().catch(err=>console.log("Error: " + err));
	});

	/**
	Response: True if operation completed, doesn't specify existence.
	*/
	app.delete('/api/goals/:id', (req, res) => {
		let id = parseInt(req.params.id);
		(async () => {
			await deleteGoal(id);
			res.end(JSON.stringify(true))
		})().catch(err=>console.log("Error: " + err));
	});
};

module.exports = goalRoutes;

async function getAllGoals(){
	const collection = db.collection('goals')
    const query = {};
    const options = {
      sort: { id: 1 }, 
      projection: { _id: 0},
    };
   const goals = await collection.find(query, options).toArray();
   console.log(goals);
   return goals;
}

async function getGoalsByUser(userid){
	const collection = db.collection('goals')
    const query = {user_id : userid};
    const options = {
      sort: { id: 1 }, 
      projection: { _id: 0},
    };
   const goals = await collection.find(query, options).toArray();
   // console.log(goals);
   return goals;
}

async function getGoal(id){
    const collection = db.collection('goals');
    const query = {_id : id};
    const goal = await collection.findOne(query);
    // console.log("Got goal from db: " + JSON. stringify(goal));
    return goal;
}
async function addGoal(goal){
	const collection = db.collection('goals');
	goal._id = await getNextGoalId(); 
	collection.insertOne(goal)
}

async function getNextGoalId(){
   var document = (await db.collection('counters').findOneAndUpdate({_id: "goalid" }, {
      $inc:{sequence_value:1}}, {returnNewDocument: true}
   )).value;
   console.log("new goal id: " + JSON.stringify(document.sequence_value))
   return document.sequence_value;
}

function addNewGoalTest(){
	let goal = {name: "Test goal"} // desc is null
	addGoal(goal);
}

// False most likely indicates goal id wasn't found
async function updateGoal(id, goal){
	const collection = db.collection('goals');
	delete goal._id;
	let result = await collection.replaceOne({_id:id}, goal);
	console.log(`updated ${result.matchedCount} goal`);
	success = result.matchedCount == 1? true : false;
	return success;
}

async function deleteGoal(id){
	const collection = db.collection('goals');
	await collection.deleteOne({_id:id});
}
