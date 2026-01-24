import { useEffect, useState } from "react";

export default function Profile({ completedtasksdata = [] }) {
  const [profiledata, setProfileData] = useState({
    firstname: "",
    lastname: "",
    age: "",
    country: "India",
  });

  completedtasksdata = JSON.parse(localStorage.getItem("completedtasks")) || [];

  const [userdata, setUserData] = useState(() => {
    const raw = localStorage.getItem("userdata");
    return raw ? JSON.parse(raw) : {};
  });

  const [isHovering, setIsHovering] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    localStorage.setItem("userdata", JSON.stringify(userdata));
  }, [userdata]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserData({ ...profiledata });
    setProfileData({
      firstname: "",
      lastname: "",
      age: "",
      country: "India",
    });
    // Show confetti animation on save
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const handleUpdate = () => {
    localStorage.removeItem("userdata");
    setUserData({});
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Fun greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  // Fun age-based emoji
  const getAgeEmoji = (age) => {
    if (!age) return "🎂";
    const ageNum = parseInt(age);
    if (ageNum < 18) return "🧒";
    if (ageNum < 30) return "🧑";
    if (ageNum < 50) return "👨";
    return "👴";
  };

  // Achievement calculations
  const totalCompleted = completedtasksdata.length;
  const easyCompleted = completedtasksdata.filter(
    (task) => task.difficulty === "easy",
  ).length;
  const mediumCompleted = completedtasksdata.filter(
    (task) => task.difficulty === "medium",
  ).length;
  const hardCompleted = completedtasksdata.filter(
    (task) => task.difficulty === "hard",
  ).length;

  // Achievement level based on completed tasks
  const getAchievementLevel = (count) => {
    if (count < 10)
      return {
        level: "Beginner",
        emoji: "🌱",
        color: "from-gray-500 to-gray-600",
      };
    if (count < 25)
      return {
        level: "Starter",
        emoji: "⭐",
        color: "from-blue-500 to-blue-600",
      };
    if (count < 50)
      return {
        level: "Achiever",
        emoji: "🏅",
        color: "from-green-500 to-green-600",
      };
    if (count < 100)
      return {
        level: "Expert",
        emoji: "🏆",
        color: "from-yellow-500 to-orange-500",
      };
    return {
      level: "Master",
      emoji: "👑",
      color: "from-purple-500 to-pink-500",
    };
  };

  const achievement = getAchievementLevel(totalCompleted);

  // Country flag emoji (simplified)
  const getCountryFlag = (country) => {
    const flags = {
      India: "🇮🇳",
      Russia: "🇷🇺",
      USA: "🇺🇸",
      UK: "🇬🇧",
      Canada: "🇨🇦",
      Australia: "🇦🇺",
      Germany: "🇩🇪",
      France: "🇫🇷",
      Japan: "🇯🇵",
      China: "🇨🇳",
      Brazil: "🇧🇷",
      Italy: "🇮🇹",
      Spain: "🇪🇸",
      "South Korea": "🇰🇷",
      "South Africa": "🇿🇦",
      Mexico: "🇲🇽",
      Argentina: "🇦🇷",
      Turkey: "🇹🇷",
      Indonesia: "🇮🇩",
      Bhutan: "🇧🇹",
      Nepal: "🇳🇵",
      Singapore: "🇸🇬",
      UAE: "🇦🇪",
    };
    return flags[country] || "🌍";
  };

  if (Object.keys(userdata).length !== 0) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-200"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-400"></div>
        </div>

        {/* Confetti animation */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-bounce-in"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              >
                {["🎉", "🎊", "✨", "🌟", "💫"][Math.floor(Math.random() * 5)]}
              </div>
            ))}
          </div>
        )}

        <div className="relative z-10 pt-10">
          <header className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 animate-slide-up">
              PROF
              <span className="text-5xl md:text-7xl text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
                𝓲
              </span>
              LE
            </h1>
            <p className="text-xl text-purple-200 animate-fade-in animation-delay-200">
              {getGreeting()}! Welcome back, {userdata.firstname}! 👋
            </p>
            {totalCompleted > 0 && (
              <p className="text-lg text-green-300 animate-fade-in animation-delay-300 mt-2">
                🎉 You've completed {totalCompleted} task
                {totalCompleted !== 1 ? "s" : ""}! Amazing work!
              </p>
            )}
          </header>

          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up animation-delay-300">
              <h2 className="text-3xl font-bold text-center mb-8 text-white flex items-center justify-center gap-3">
                <span className="text-4xl">👤</span>
                About You
                <span className="text-4xl">✨</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Profile Avatar Section */}
                <div className="text-center">
                  <div
                    className="w-32 h-32 mx-auto mb-6 bg-linear-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-6xl shadow-2xl transform hover:scale-110 transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                  >
                    {isHovering ? "😊" : getAgeEmoji(userdata.age)}
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">
                    {userdata.firstname} {userdata.lastname}
                  </div>
                  <div className="text-purple-200 text-lg">
                    {achievement.level} {achievement.emoji}
                  </div>
                </div>

                {/* Profile Details */}
                <div className="space-y-6">
                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-linear-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-2xl">
                        👤
                      </div>
                      <div>
                        <label className="text-purple-200 text-sm font-medium">
                          Full Name
                        </label>
                        <div className="text-white text-xl font-semibold">
                          {userdata.firstname} {userdata.lastname}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-2xl">
                        {getAgeEmoji(userdata.age)}
                      </div>
                      <div>
                        <label className="text-purple-200 text-sm font-medium">
                          Age
                        </label>
                        <div className="text-white text-xl font-semibold">
                          {userdata.age} years old
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl">
                        {getCountryFlag(userdata.country)}
                      </div>
                      <div>
                        <label className="text-purple-200 text-sm font-medium">
                          Country
                        </label>
                        <div className="text-white text-xl font-semibold">
                          {userdata.country}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Achievement Stats Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div
                  className={`bg-gradient-to-r ${achievement.color} bg-opacity-20 rounded-2xl p-4 text-center border border-white/20`}
                >
                  <div className="text-3xl mb-2">{achievement.emoji}</div>
                  <div className="text-white font-semibold">
                    {achievement.level}
                  </div>
                  <div className="text-purple-200 text-sm">Current Rank</div>
                </div>
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl p-4 text-center border border-green-300/20">
                  <div className="text-3xl mb-2">🎯</div>
                  <div className="text-white font-semibold">
                    {totalCompleted}
                  </div>
                  <div className="text-green-200 text-sm">Tasks Completed</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 text-center border border-blue-300/20">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-white font-semibold">
                    {mediumCompleted + hardCompleted}
                  </div>
                  <div className="text-blue-200 text-sm">Challenging Tasks</div>
                </div>
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-4 text-center border border-orange-300/20">
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-white font-semibold">
                    {hardCompleted}
                  </div>
                  <div className="text-orange-200 text-sm">Hard Tasks</div>
                </div>
              </div>

              {/* Detailed Achievement Breakdown */}
              {totalCompleted > 0 && (
                <div className="mt-6 bg-white/5 rounded-2xl p-6 border border-white/10">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    Achievement Breakdown
                  </h3>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-green-500/20 rounded-xl p-3 border border-green-300/20">
                      <div className="text-2xl mb-1">🌟</div>
                      <div className="text-white font-bold">
                        {easyCompleted}
                      </div>
                      <div className="text-green-200 text-sm">Easy</div>
                    </div>
                    <div className="bg-yellow-500/20 rounded-xl p-3 border border-yellow-300/20">
                      <div className="text-2xl mb-1">⚡</div>
                      <div className="text-white font-bold">
                        {mediumCompleted}
                      </div>
                      <div className="text-yellow-200 text-sm">Medium</div>
                    </div>
                    <div className="bg-red-500/20 rounded-xl p-3 border border-red-300/20">
                      <div className="text-2xl mb-1">🔥</div>
                      <div className="text-white font-bold">
                        {hardCompleted}
                      </div>
                      <div className="text-red-200 text-sm">Hard</div>
                    </div>
                  </div>

                  {/* Progress to next level */}
                  {totalCompleted < 20 && (
                    <div className="mt-4 p-3 bg-purple-500/10 rounded-xl border border-purple-300/20">
                      <div className="text-purple-200 text-sm text-center">
                        {totalCompleted < 10 &&
                          `Complete ${10 - totalCompleted} more tasks to become a ⭐ Starter!`}
                        {totalCompleted >= 10 &&
                          totalCompleted < 25 &&
                          `Complete ${25 - totalCompleted} more tasks to become a 🏅 Achiever!`}
                        {totalCompleted >= 25 &&
                          totalCompleted < 50 &&
                          `Complete ${50 - totalCompleted} more tasks to become an 🏆 Expert!`}
                        {totalCompleted >= 50 &&
                          totalCompleted < 100 &&
                          `Complete ${100 - totalCompleted} more tasks to become an 👑 Master!`}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Fun Stats Section */}
              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-4 text-center border border-pink-300/20">
                  <div className="text-3xl mb-2">✅</div>
                  <div className="text-white font-semibold">
                    Profile Complete
                  </div>
                  <div className="text-purple-200 text-sm">100%</div>
                </div>
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-4 text-center border border-blue-300/20">
                  <div className="text-3xl mb-2">⭐</div>
                  <div className="text-white font-semibold">Status</div>
                  <div className="text-blue-200 text-sm">Active User</div>
                </div>
                <div
                  className={`bg-gradient-to-r ${achievement.color} bg-opacity-20 rounded-2xl p-4 text-center border border-white/20`}
                >
                  <div className="text-3xl mb-2">{achievement.emoji}</div>
                  <div className="text-white font-semibold">Level</div>
                  <div className="text-green-200 text-sm">
                    {achievement.level}
                  </div>
                </div>
              </div>

              <div className="mt-8 text-center">
                <button
                  onClick={handleUpdate}
                  className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    ✏️ Edit Profile
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-200"></div>
        <div className="absolute top-1/3 right-1/3 w-40 h-40 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse animation-delay-400"></div>
      </div>

      {/* Confetti animation */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce-in text-2xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {
                ["🎉", "🎊", "✨", "🌟", "💫", "🎯"][
                  Math.floor(Math.random() * 6)
                ]
              }
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 pt-10">
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl text-white font-bold mb-4 animate-slide-up">
            PROF
            <span className="text-5xl md:text-7xl text-transparent bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text">
              𝓲
            </span>
            LE
          </h1>
          <p className="text-xl text-purple-200 animate-fade-in animation-delay-200">
            {getGreeting()}! Let's create your profile! 🚀
          </p>
        </header>

        <div className="max-w-2xl mx-auto px-6">
          <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-8 animate-slide-up animation-delay-300">
            <h2 className="text-3xl font-bold text-center mb-8 text-white flex items-center justify-center gap-3">
              <span className="text-4xl">✨</span>
              Tell Us About You
              <span className="text-4xl">✨</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-purple-200 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    First Name
                  </label>
                  <input
                    name="firstname"
                    className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-purple-300"
                    placeholder="Enter your first name"
                    type="text"
                    value={profiledata.firstname}
                    onChange={handlechange}
                  />
                </div>
                <div className="group">
                  <label className="block text-purple-200 text-sm font-medium mb-2 flex items-center gap-2">
                    <span className="text-lg">👤</span>
                    Last Name
                  </label>
                  <input
                    name="lastname"
                    className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition-all duration-300 placeholder-purple-300"
                    placeholder="Enter your last name"
                    type="text"
                    value={profiledata.lastname}
                    onChange={handlechange}
                  />
                </div>
              </div>

              <div className="group">
                <label className="block text-purple-200 text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="text-lg">
                    {getAgeEmoji(profiledata.age)}
                  </span>
                  Age
                </label>
                <input
                  name="age"
                  className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300 placeholder-purple-300"
                  placeholder="How old are you?"
                  type="number"
                  value={profiledata.age}
                  onChange={handlechange}
                />
              </div>

              <div className="group">
                <label className="block text-purple-200 text-sm font-medium mb-2 flex items-center gap-2">
                  <span className="text-lg">
                    {getCountryFlag(profiledata.country)}
                  </span>
                  Country
                </label>
                <select
                  name="country"
                  className="w-full bg-white/10 backdrop-blur-sm text-white px-4 py-3 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition-all duration-300"
                  value={profiledata.country}
                  onChange={handlechange}
                >
                  <option value="India" className="bg-gray-800">
                    🇮🇳 India
                  </option>
                  <option value="Russia" className="bg-gray-800">
                    🇷🇺 Russia
                  </option>
                  <option value="USA" className="bg-gray-800">
                    🇺🇸 USA
                  </option>
                  <option value="UK" className="bg-gray-800">
                    🇬🇧 UK
                  </option>
                  <option value="Canada" className="bg-gray-800">
                    🇨🇦 Canada
                  </option>
                  <option value="Australia" className="bg-gray-800">
                    🇦🇺 Australia
                  </option>
                  <option value="Germany" className="bg-gray-800">
                    🇩🇪 Germany
                  </option>
                  <option value="France" className="bg-gray-800">
                    🇫🇷 France
                  </option>
                  <option value="Japan" className="bg-gray-800">
                    🇯🇵 Japan
                  </option>
                  <option value="China" className="bg-gray-800">
                    🇨🇳 China
                  </option>
                  <option value="Brazil" className="bg-gray-800">
                    🇧🇷 Brazil
                  </option>
                  <option value="Italy" className="bg-gray-800">
                    🇮🇹 Italy
                  </option>
                  <option value="Spain" className="bg-gray-800">
                    🇪🇸 Spain
                  </option>
                  <option value="South Korea" className="bg-gray-800">
                    🇰🇷 South Korea
                  </option>
                  <option value="South Africa" className="bg-gray-800">
                    🇿🇦 South Africa
                  </option>
                  <option value="Mexico" className="bg-gray-800">
                    🇲🇽 Mexico
                  </option>
                  <option value="Argentina" className="bg-gray-800">
                    🇦🇷 Argentina
                  </option>
                  <option value="Turkey" className="bg-gray-800">
                    🇹🇷 Turkey
                  </option>
                  <option value="Indonesia" className="bg-gray-800">
                    🇮🇩 Indonesia
                  </option>
                  <option value="Bhutan" className="bg-gray-800">
                    🇧🇹 Bhutan
                  </option>
                  <option value="Nepal" className="bg-gray-800">
                    🇳🇵 Nepal
                  </option>
                  <option value="Singapore" className="bg-gray-800">
                    🇸🇬 Singapore
                  </option>
                  <option value="UAE" className="bg-gray-800">
                    🇦🇪 UAE
                  </option>
                </select>
              </div>

              {/* Fun preview section */}
              {(profiledata.firstname || profiledata.lastname) && (
                <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl p-6 border border-pink-300/20 animate-fade-in">
                  <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                    <span className="text-xl">👀</span>
                    Preview
                  </h3>
                  <div className="text-purple-200">
                    Hello,{" "}
                    <span className="text-white font-bold">
                      {profiledata.firstname} {profiledata.lastname}
                    </span>
                    !
                    {profiledata.age && (
                      <span> You're {profiledata.age} years old</span>
                    )}
                    {profiledata.country && (
                      <span>
                        {" "}
                        from {getCountryFlag(profiledata.country)}{" "}
                        {profiledata.country}
                      </span>
                    )}
                    .
                  </div>
                </div>
              )}

              <div className="flex justify-center gap-4 pt-4">
                <button
                  type="button"
                  onClick={() =>
                    setProfileData({
                      firstname: "",
                      lastname: "",
                      age: "",
                      country: "India",
                    })
                  }
                  className="group relative px-6 py-3 bg-white/10 backdrop-blur-sm text-purple-200 font-semibold rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                >
                  <span className="text-lg">🔄</span>
                  Reset
                </button>
                <button
                  type="submit"
                  className="group relative px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden flex items-center gap-2"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <span className="text-lg">💾</span>
                    Save Profile
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            </form>
          </div>

          {/* Fun motivational section */}
          <div className="mt-8 text-center animate-fade-in animation-delay-400">
            <div className="text-4xl mb-2">🌟</div>
            <p className="text-purple-200 text-lg">
              Ready to become a productivity superstar?
            </p>
            {totalCompleted === 0 && (
              <p className="text-purple-300 text-sm mt-2">
                Complete your first task to start earning achievements! 🎯
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
