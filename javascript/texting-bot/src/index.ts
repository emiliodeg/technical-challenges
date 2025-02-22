import { ParseTextBotCommandOutput, Group } from "./interfaces";
/**
 * We're writing a command line program that users can use to send text messages
 * to different groups of people. The program will take in a string, and parse it
 * to determine which group of people to send the message to, and what the message
 * should be.
 *
 * For example, if the user says "txt GROUP1 Hello, world!", the program
 * should send the message "Hello, world!" to everyone in GROUP1.
 *
 * If there is a group named "sart group", and the user says "txt sart group Hello, world!",
 * then we'll send a text message to everyone in the "sart group" group.
 *
 * Your goal here is to implement the `parseTextBotCommand` function, which will
 * determine the group to send the message to, and the message to send.
 *
 * Details:
 * - When parsing the group name, please ignore any leading or
 * trailing space, case, and any spaces between words (if the group name
 * contains multiple words).
 *
 * - Once you've parsed the group name please return the
 * message with leading and trailing spaces removed and no
 * other changes. Empty values as "messageToSend" are allowed.
 *
 * If you cannot determine a group and message, return null.
 *
 * @param rawInput
 */

/**
 * Splits a string into two parts at the first substring of white spaces.
 * If no such space is found, it returns an empty array.
 * @param {string} str
 * @returns {string[]} containing the substring before and after the first spaces substring
 */
const partialSplit = (str: string): string[] => {
  let i = 0;
  let start: number | null = null;
  let end: number | null = null;

  while (i < str.length) {
    if (str[i] === " " && start === null) {
      start = i;
    } else if (str[i] !== " " && start !== null) {
      end = i;
      break;
    }

    i++;
  }

  if (start === null || end === null) return [];

  return [str.slice(0, start), str.slice(end)];
};

export const parseTextBotCommand = (
  rawInput: string,
  groups: Group[]
): ParseTextBotCommandOutput | null => {
  const [command, rest] = partialSplit(rawInput.trim());

  if (command?.toLowerCase() !== "txt" || !rest) return null;

  // map of group name to group 
  const hashGroups = groups.reduce(
    (acc, group) => acc.set(group.name.toLowerCase(), group),
    new Map<string, Group>()
  );

  // parse the group name and message
  let [groupName, messageToSend] = partialSplit(rest);
  groupName = groupName.toLowerCase();

  // if the group name is not found try to guess it
  while (!hashGroups.has(groupName) || !messageToSend) {
    const [before, after] = partialSplit(messageToSend);

    groupName += ` ${before}`.toLowerCase();
    messageToSend = after;
  }

  const found = hashGroups.get(groupName);

  if (!found) return null;

  return {
    groupId: found.id,
    messageToSend
  };
};
