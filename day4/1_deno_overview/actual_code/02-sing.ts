export function sing(phrase: string, times: number): string {
  const song = Array(times).fill(phrase).join(" ");
  return song;
}

if (import.meta.main) {
  console.log(sing("la", 3112));
}
