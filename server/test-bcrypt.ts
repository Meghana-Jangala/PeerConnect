import bcrypt from "bcryptjs";

async function run() {
  const plain = "meg123";

  // hash
  const hash = await bcrypt.hash(plain, 10);
  console.log("Hash:", hash);

  // compare with correct password
  const match = await bcrypt.compare("meg123", hash);
  console.log("Compare result (correct password):", match);

  // compare with wrong password
  const wrong = await bcrypt.compare("wrongpass", hash);
  console.log("Compare result (wrong password):", wrong);
}

run();
