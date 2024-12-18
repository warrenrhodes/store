#!/bin/bash

# Generate keyfile
mkdir -p /scripts
openssl rand -base64 756 > /etc/mongodb/keyfile
chmod 400 /etc/mongodb/keyfile
chown mongodb:mongodb /etc/mongodb/keyfile

# Start MongoDB with authentication and replica set
mongod --replSet rs0 --bind_ip_all --keyFile /etc/mongodb/keyfile --auth &

# Wait for MongoDB to start
sleep 20

# Initialize replica set
mongosh <<EOF
use admin
db.createUser({
  user: "natureGift",
  pwd: "natureGift",
  roles: ["root"]
})

rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongodb-primary:27017", priority: 3 },
    { _id: 1, host: "mongodb-secondary:27017", priority: 2 },
    { _id: 2, host: "mongodb-arbiter:27017", arbiterOnly: true }
  ]
})
EOF

# Keep the process running
wait