async function up(db, client) {
  // Fixed the migration script to remove the collection and add categories
  // Example:
  // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: true}});
  await db.collection("products").updateMany({}, { $unset: { category: "" } });
  await db
    .collection("products")
    .updateMany({}, { $unset: { collections: "" } });
  await db.collection("products").updateMany({}, { $set: { categories: [] } });
}
export async function down(db, client) {
  // TODO write the statements to rollback your migration (if possible)
  // Example:
  // await db.collection('albums').updateOne({artist: 'The Beatles'}, {$set: {blacklisted: false}});
}
