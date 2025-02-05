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

function updateProfile<K extends keyof UserProfile>(
  profile: UserProfile,
  key: K,
  value: UserProfile[K]
) {
  const newProfile = structuredClone(profile);
  // if (key === "city" && typeof value === "string") {
  //   newProfile["location"]["city"] = value;
  //   return newProfile;
  // }
  newProfile[key] = value;
  return newProfile;
}

function updateProfileOld(
  profile: UserProfile,
  key: string,
  value: string | boolean | number
) {
  const newProfile = { ...profile, [key]: value };
  // if (key === "city" && typeof value === "string") {
  //   newProfile["location"]["city"] = value;
  //   return newProfile;
  // }
  // newProfile[key] = value;
  return newProfile;
}
console.log(updateProfile(userProfile, "username", "Bombay"));

console.log(userProfile);
