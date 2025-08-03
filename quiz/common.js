async function cmnLoadWords(words, fnPickWord) {
  words = [];
  const res = await fetch('../data/target_1900.json');
  words = await res.json();
  fnPickWord(words);
}
