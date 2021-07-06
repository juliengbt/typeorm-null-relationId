import { ConnectionOptions, createConnection } from "typeorm"
import { User } from "./entity/user"
import { Message } from "./entity/message"

const options: ConnectionOptions = {
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "root",
  database: `null-relationId`,
  entities: [ User, Message ],
  logging: true,
  synchronize: true
}

async function main () {
  const connection = await createConnection(options);
  const messageRepo = connection.getRepository(Message);
  const userRepo= connection.getRepository(User);

  // UUIDs samples
  const user1ID = Buffer.from([135,114,221,160,230,218,17,234,175,15,4,237,51,12,208,0]);
  const user2ID = Buffer.from([50,114,221,160,230,218,17,234,175,15,4,237,51,12,208,0]);
  const messageID = Buffer.from([64,114,221,160,230,218,17,234,175,15,4,237,51,12,208,0]);

  // Clear tables
  await messageRepo.createQueryBuilder("User").delete().execute();
  await userRepo.createQueryBuilder("Message").delete().execute();

  // Inserting users, works fine
  
  const user1: User = {
    id: user1ID,
    name: "user1"
  }

  const user2: User = {
    id: user2ID,
    name: "user2"
  }

  await userRepo.save([user1, user2]);

  // Inserting message : works fine

  const message: Message = {
    id: messageID,
    sender: user1,
    text: "Oui"
  }

  await messageRepo.save(message);

  console.log(await messageRepo.createQueryBuilder("message")
    .leftJoinAndMapOne("message.sender", "message.sender", "user")
    .where("message.id = :id", { id: messageID })
    .getOne());


  // Updating message.sender
  // Fails on save: tries to update message.senderId to null instead of user2.id

  message.sender = user2;
  await messageRepo.save(message);

  console.log(await messageRepo.createQueryBuilder("message")
  .leftJoinAndMapOne("message.sender", "message.sender", "user")
  .where("message.id = :id", { id: messageID })
  .getOne());
  
}

main().catch(console.error)
