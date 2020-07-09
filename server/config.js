try {
	switch(process.env.NODE_ENV){
		case 'development':
			process.env.DB_URL = `postgres://${process.env.PG_USERNAME}@${process.env.PG_HOSTNAME}:${process.env.PG_PORT}/${process.env.PG_DB_NAME}`;
		break;
	}
} catch (err) {
	console.log(err, '\n\nError configuring the project. Have you set the environment variables?');
}