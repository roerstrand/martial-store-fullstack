const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const Product = require("./models/productModel");
const Article = require("./models/articleModel");
const User = require("./models/userModel");
const bcrypt = require("bcrypt");

const MONGO_URI = process.env.MONGO_URI;

const users = [
  {
    name: "Admin",
    email: "admin@apexcore.com",
    password: "admin1234",
  },

  {
    name: "Customer",
    email: "customer@apexcore.com",
    password: "customer1234",
  },
];

const products = (userId) => [
  {
    user_id: userId,
    title: "BJJ Gi",
    price: 79,
    description: "Premium Brazilian Jiu-Jitsu gi for training and competition.",
    image: "bjj_gi.jpg",
    category: "bjj",
    rating: 4,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Women's Boxing Startkit",
    price: 29,
    description: "Complete boxing starter kit for women.",
    image: "womens_boxing_startkit.jpg",
    category: "boxing",
    rating: 4,
    sale: 20,
  },
  {
    user_id: userId,
    title: "Shin Guards",
    price: 39,
    description: "Protective shin guards for Muay Thai and kickboxing.",
    image: "shin_guards.jpg",
    category: "muaythai",
    rating: 5,
    sale: 15,
  },
  {
    user_id: userId,
    title: "Boxing Bag",
    price: 199,
    description: "Heavy duty boxing bag for intense training sessions.",
    image: "boxing_bag.jpg",
    category: "boxing",
    rating: 5,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Black Boxing Gloves",
    price: 49,
    description: "Durable boxing gloves for training and sparring.",
    image: "black_boxing_gloves.jpg",
    category: "boxing",
    rating: 4,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Boxing Helmet",
    price: 59,
    description: "Full protection boxing helmet for safe sparring.",
    image: "boxing_helmet.jpg",
    category: "boxing",
    rating: 4,
    sale: 10,
  },
  {
    user_id: userId,
    title: "Karate Kimono",
    price: 69,
    description: "Traditional karate gi for training and grading.",
    image: "karate_kimono.jpg",
    category: "karate",
    rating: 4,
    sale: 25,
  },
  {
    user_id: userId,
    title: "Boxing Pads",
    price: 44,
    description: "Focus pads for pad work and technique training.",
    image: "boxing_pads.jpg",
    category: "boxing",
    rating: 5,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Boxing Boots",
    price: 89,
    description: "Lightweight boxing boots for speed and ankle support.",
    image: "boxing_boots.jpg",
    category: "boxing",
    rating: 4,
    sale: 30,
  },
  {
    user_id: userId,
    title: "Snake Skin Boxing Gloves",
    price: 69,
    description: "Premium snake skin pattern boxing gloves for style and performance.",
    image: "margo-evardson-YYouq46SOXw-unsplash.jpg",
    category: "boxing",
    rating: 5,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Blue BJJ Gi",
    price: 89,
    description: "Competition-grade blue BJJ gi with reinforced stitching.",
    image: "BJJ_GI_blue.jpg",
    category: "bjj",
    rating: 5,
    sale: 0,
  },
  {
    user_id: userId,
    title: "BJJ Rashguard",
    price: 39,
    description: "Compression rashguard for no-gi training and competition.",
    image: "BJJ_rashguard.jpg",
    category: "bjj",
    rating: 4,
    sale: 10,
  },
  {
    user_id: userId,
    title: "No-Gi Shorts",
    price: 34,
    description: "Lightweight grappling shorts for no-gi BJJ and submission wrestling.",
    image: "BJJ_nogishorts.jpg",
    category: "bjj",
    rating: 4,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Muay Thai Shorts",
    price: 29,
    description: "Traditional Muay Thai shorts with wide cut for full kicking range.",
    image: "muay_thai_shorts.jpg",
    category: "muaythai",
    rating: 4,
    sale: 15,
  },
  {
    user_id: userId,
    title: "Ankle Guards",
    price: 19,
    description: "Elastic ankle supports for Muay Thai and kickboxing training.",
    image: "muay_thai_ancle_guards.jpg",
    category: "muaythai",
    rating: 4,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Karate Belt",
    price: 12,
    description: "Traditional cotton karate belt available in all grades.",
    image: "karate_belt.jpg",
    category: "karate",
    rating: 4,
    sale: 0,
  },
  {
    user_id: userId,
    title: "Karate Helmet",
    price: 49,
    description: "Full-face karate helmet for safe kumite sparring.",
    image: "karate_helmet.jpg",
    category: "karate",
    rating: 4,
    sale: 20,
  },
];

const articles = [
  {
    title: "My Road to a Black Belt",
    excerpt: "A personal journey through years of dedication, sweat, and perseverance on the mats.",
    content: `I walked into my first BJJ class at thirty-two years old, convinced I was already too old to start. The instructor paired me with a fourteen-year-old who submitted me seven times in a five-minute round. I drove home thinking I would never go back.\n\nI went back. Something about the puzzle of it — the way every position had a counter, every attack had a defense — made it impossible to stay away. The early years were humbling in a way nothing else in my life had prepared me for. A black belt is not given to the most talented person in the room. It is given to the person who refuses to quit when quitting would be the rational choice.\n\nTen years later, my instructor tied that belt around my waist in front of the people who had trained alongside me through every injury, every plateau, every moment of doubt. I have a degree on my wall and a career I am proud of, but nothing I have earned has meant more to me than the belt I wore home that evening.`,
    author: "Jon Doe",
    image: "road_to_blackbelt.jpg",
    category: "bjj",
  },
  {
    title: "Tips for Finishing the Sweep",
    excerpt: "Breaking down the mechanics behind converting sweeps into dominant positions and submissions.",
    content: `The sweep is one of the most underestimated tools in BJJ. Most beginners focus on the setup — the underhook, the angle, the timing — but the sweep ends the moment you reach top position. What you do in that first half-second determines whether you score or scramble back to guard.\n\nThe key is weight distribution. Before you commit to the sweep, load your weight onto your opponent's posted limb. If they post with a hand, collapse the elbow outward as you complete the rotation. This leaves them flat rather than on their side, and flat means you can immediately establish a cross-face and begin passing. Never allow them a frame to rebuild guard.\n\nOnce on top, the common mistake is pausing to celebrate the sweep. Instead, keep moving. Drive your knee through their half-guard before they can hook it, and settle your chest low onto theirs. High hips are easy to escape. Flat, heavy pressure is not. Master the transition from sweep to pass and your guard game will become twice as dangerous overnight.`,
    author: "Sergey Meregali",
    image: "tips_for_finishing_the_sweep.jpg",
    category: "bjj",
  },
  {
    title: "The Triangle Choke: BJJ's Most Iconic Submission",
    excerpt: "Unpacking the geometry and timing behind one of grappling's most effective submissions.",
    content: `The triangle choke is, in many ways, a metaphor for Brazilian Jiu-Jitsu itself. It looks simple from the outside — you wrap your legs around someone's neck — but the details that make it work are endless. Angle, hip extension, the position of the trapped arm, the direction of the squeeze: every variable matters.\n\nThe most common error is trying to lock the triangle before creating the angle. If you are flat on your back when you close the figure-four, your opponent can stack you and apply pressure until your grip fails. The angle comes first. Shrimp out forty-five degrees toward the trapped arm, pull their head down, and then squeeze. Done in the right order, the choke is almost inescapable.\n\nMastering the triangle teaches you a lesson that applies across all of BJJ: position before submission. The choke does not win the fight — the series of small adjustments that create the right geometry wins it. Train the setup obsessively, and the finish becomes automatic.`,
    author: "Jon Doe",
    image: "grappling_ground.jpg",
    category: "bjj",
  },
  {
    title: "Why the Jab Wins Fights",
    excerpt: "The most underrated punch in boxing is also the most important. Here is why elite fighters live and die by it.",
    content: `Ask any elite boxing coach which punch wins the most fights and the answer is almost always the same: the jab. Not the cross, not the hook, not the uppercut that ends up on highlight reels. The jab — short, quick, unremarkable — is the engine behind everything else.\n\nMuhammad Ali used the jab to control distance so completely that opponents spent entire bouts reaching for a man they could not touch. Larry Holmes, one of the most technically pure heavyweights in history, won championships with a jab that was less a single punch than a continuous presence — always in his opponent's face, always disrupting their rhythm.\n\nThe jab sets up every combination. It tells you whether your opponent is going to roll with the punch or stand their ground. It scores points, cuts vision, and keeps you safe because throwing it keeps your shoulder up and your guard tight. Beginners want to learn the right hand. Champions learn the jab. Spend thirty minutes on your jab for every ten minutes you spend on power punches and your entire game will improve inside a month.`,
    author: "Marcus Reid",
    image: "woman_headkick.jpg",
    category: "boxing",
  },
  {
    title: "Muay Thai: The Art of Eight Limbs",
    excerpt: "How Thailand's national sport became the world's most complete striking system — and why it belongs in every fighter's toolkit.",
    content: `Muay Thai has been practiced in Thailand for centuries, developed by soldiers who needed a combat system that worked when weapons were lost. It uses fists, elbows, knees, and shins — eight points of contact compared to the four that Western boxing allows — and the result is a striking art of extraordinary range and versatility.\n\nThe elbow is what separates Muay Thai from every other striking system. Thrown correctly, it opens cuts that stop fights in seconds and generates more force over a shorter distance than almost any other strike. The knee, driven from the clinch into the body or the head, is equally devastating and significantly harder to defend against than a kick of equivalent power.\n\nWhat makes Muay Thai indispensable in modern MMA is that it solves the clinch. Where boxing becomes ineffective at close range, Muay Thai thrives. Fighters like Anderson Silva and Jose Aldo built careers on the ability to transition seamlessly from the outside to the clinch and back, using the full eight-limb arsenal to keep opponents guessing at every distance. If you train only one striking art, train this one.`,
    author: "Nong-O Gaiyanghadao",
    image: "muaythai_fight.jpg",
    category: "muaythai",
  },
  {
    title: "Sparring Smart: How to Get Better Without Getting Hurt",
    excerpt: "The fighters who last longest in Muay Thai are the ones who learn to spar with their head, not just their body.",
    content: `There is a version of Muay Thai training that burns people out within two years. It involves showing up every session, sparring hard every session, and treating every round as a fight. The gym that trains this way produces a few very tough fighters and a lot of former fighters with damaged knees and chronic headaches.\n\nThe fighters who make it to forty — still sharp, still competitive — have almost all learned the same lesson early: sparring is not fighting. It is an information-gathering exercise. Your goal in a sparring round is to try things you cannot try in a real fight, to expose weaknesses in a controlled environment, and to give your training partner the same opportunity. You are supposed to get hit. Getting hit teaches you what does and does not work at range.\n\nKeep one hard sparring day per week. Use the rest for technical rounds at fifty percent, working specific scenarios. Tell your partner which technique you want to practice defending against. Set up problems and solve them. The gym is a laboratory, not a proving ground. Protect your brain, protect your joints, and you will still be training in twenty years when the fighters who went hard every day have long since stopped.`,
    author: "Saenchai",
    image: "muaythai_sparr.jpg",
    category: "muaythai",
  },
  {
    title: "Kata: The Living Encyclopedia of Karate",
    excerpt: "Kata is far more than choreography. It is a compressed archive of combat knowledge passed down through centuries.",
    content: `Beginners often misunderstand kata. They see a practitioner moving through a fixed sequence of techniques with no opponent present and conclude it is performance — something decorative, disconnected from real fighting. This misunderstanding is understandable and almost entirely wrong.\n\nKata is a mnemonic device. Before written manuals and video footage, the only way to preserve the technical knowledge of a fighting system was to encode it in movement. Each kata stores combinations, principles of footwork, and responses to specific attacks. The bunkai — the application — unpacks what the form contains. A single movement in a kata might represent a block, a joint lock, and a takedown depending on the context in which you interpret it.\n\nThe meditative value of kata is real and separate from its combat utility. Moving slowly through Heian Shodan with full attention on every transition teaches body awareness in a way that sparring cannot. You are forced to examine each position without the distraction of an opponent, to notice where your weight sits, where your guard is open. Done this way, kata practice is not separate from fighting training. It is the most focused version of it.`,
    author: "Hidetaka Nishiyama",
    image: "karate_sunset.jpg",
    category: "karate",
  },
  {
    title: "How My Role Models Inspired Me",
    excerpt: "The fighters and coaches who shaped my mindset and pushed me to become the athlete I am today.",
    content: `I was fourteen when I watched Anderson Silva walk to the octagon for the first time. He moved differently from every other fighter I had seen — loose, unhurried, almost bored. Then the fight started. What I witnessed over the next three rounds was not just athletic skill. It was the expression of someone who had internalized a martial art so completely that it had become part of how he thought.\n\nI trained with a lot of people over the years who were stronger than me, faster than me, more naturally gifted. Almost none of them stayed. The ones who built something — the ones who went from white belt to black belt, from amateur to professional — were the ones who had found someone worth emulating. Not copying. Emulating. Taking the qualities that made their role model exceptional and asking how those qualities could be built in themselves.\n\nFind your role model and study them carefully. Not the highlight reels — the interviews, the training footage, the matches they lost. The losses tell you more than the victories ever will. Every great fighter has been broken and come back rebuilt. That is the quality worth learning.`,
    author: "Chen Gracie",
    image: "how_my_rolemodels_inspired_me.jpg",
    category: "general",
  },
];

const seed = async () => {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to DB");

  await Product.deleteMany();
  await Article.deleteMany();
  await User.deleteMany();
  console.log("Collections cleared");

  const createdUsers = [];
  for (const userData of users) {
    const hashed = await bcrypt.hash(userData.password, 10);
    const user = await User.create({ ...userData, password: hashed });
    createdUsers.push(user);
    console.log(`User created: ${user.email}`);
  }

  await Product.insertMany(products(createdUsers[0]._id));
  console.log("Products seeded");

  await Article.insertMany(articles);
  console.log("Articles seeded");

  await mongoose.disconnect();
  console.log("Done");
};

seed().catch((err) => {
  console.error(err);
  mongoose.disconnect();
});
