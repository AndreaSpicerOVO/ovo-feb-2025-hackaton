interface UserProfile {
  username: string;
  email: string;
  premiumMember: boolean;
  location: {
    city: string;
    country: string;
  };
}

type UserProfileValue = string | number | boolean;

interface DetailedUserProfile extends UserProfile {
  [key: string]: UserProfileValue;
}

const userProfile: UserProfile = {
  username: "avani.acharya",
  email: "avani.acharya@theinternet.com",
  premiumMember: true,
  // age: 30,
  // country: "India",
  location: {
    city: "Chanai",
    country: "India",
  },
};

function updateProfile(
  profile: UserProfile,
  key: string,
  value: string | number | boolean
) {
  const newProfile = structuredClone(profile);
  if (key === "city" && typeof value === "string") {
    newProfile["location"]["city"] = value;
    return newProfile;
  }
  newProfile[key] = value;
  return newProfile;
}

console.log(updateProfile(userProfile, "city", "Bombay"));

console.log(userProfile);
