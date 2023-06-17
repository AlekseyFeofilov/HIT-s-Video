export class HashHelper {
  static stringToColour(str: string) {
    let hash = 0;
    let colour = '#';
    let transparency = "55"

    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }

    return colour + transparency;
  }
}
