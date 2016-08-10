/**
 * @file generate-translation-base.js
 *
 * @summary Script that extracts all the translation strings from the project.
 *
 * @author Angel Castillo <angel.castillo@biglup.com>
 * @date   August 10 2016
 *
 * @copyright Copyright 2016 Biglup. All Rights Reserved.
 *
 * Confidential Information of Biglup. Not for disclosure or distribution
 * prior written consent. This software contains code, techniques and know-how which
 * is confidential and proprietary to Biglup.
 *
 * Use of this software is subject to the terms of an end user license agreement.
 */

// REQUIRES ***********************************************************************************************************/

var fs   = require('fs');
var path = require('path');

// CONSTANTS / FILTERS ************************************************************************************************/

const EXCLUDED_FOLDERS    = ['.meteor', 'node_modules', 'typings', '.git', '.idea', '.tools'];
const INCLUDED_EXTENSIONS = ['.htm', '.html', '.xhtml', '.ts', '.js'];

// CONSTANTS / REGULAR EXPRESSIONS ************************************************************************************/

/**
 * @summary This regular expression match any convination of characters between '{{' and '| translate }}'. The content
 * can be enclosed in '." or `. The expression will work no matter how the segments are spaced (white space, tabs or
 * even line breaks).
 *
 * I.E:
 *
 *  {{ "This is a translateable" || translate }}
 *
 * Match: This is a translateable
 *
 * @remarks
 *
 * (            # Group start.
 *   ?:         # Non capturing group.
 *   {{         # Match the literal string '{{'.
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 *   (          # Group Start.
 *     ?:       # Non capturing group.
 *     '|"      # Pipe. Match ' or ".
 *    )         # End of Group.
 *   |`         # Pipe. Match the preceeding token or `.
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 * )            # End of Group.
 * (.*?)        # This is the result group. It will match any convination and amount of characters.
 * (            # Group start.
 *   ?=         # Lookahead. Start of positive look ahead assertion.
 *   (          # Group start.
 *     ?:       # Non capturing group.
 *     (        # Group start.
 *       ?:     # Non capturing group.
 *       '|"    # Pipe. Match ' or ".
 *      )       # End of Group.
 *      |`      # Pipe. Match the preceeding token or `.
 *   )          # End of Group.
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 *   \|         # Match the literal character '|' (| is scaped).
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 *   translate  # Match the literal string 'translate'
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 *   }}         # Match the literal string '}}'
 * )            # End of Group.
 */
const PIPE_TRANSLATIONS_REGEX = /(?:{{\s*(?:'|")|`\s*)(.*?)(?=(?:(?:'|")|`)\s*\|\s*translate\s*}})/g;

/**
 * @summary This regular expression match any convination of characters between '_T(' and ')'. The content
 * can be enclosed in '." or `. The expression will work no matter how the segments are spaced (white space, tabs or
 * even line breaks).
 *
 * I.E:
 *
 *  _T("This is a translateable")
 *
 * Match: This is a translateable
 *
 * @remarks
 *
 * (            # Group start.
 *   ?:         # Non capturing group.
 *   _T         # Match the literal string '_T'.
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 *   \(         # Match the literal character '('
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 * )            # End of Group.
 * (            # Group start.
 *   ?:         # Non capturing group.
 *   (          # Group start.
 *     ?:       # Non capturing group.
 *     '|"      # Pipe. Match ' or ".
 *   )          # End of Group.
 *   |`         # Pipe. Match the preceeding token or `.
 * )            # End of Group.
 * (.*?)        # This is the result group. It will match any convination and amount of characters.
 * (            # Group start.
 *   ?:         # Non capturing group.
 *   (          # Group start.
 *     ?:       # Non capturing group.
 *     '|"      # Pipe. Match ' or ".
 *   )          # End of Group.
 *   |`         # Pipe. Match the preceeding token or `.
 * )            # End of Group.
 * (            # Group Start.
 *   ?:         # Non capturing group.
 *   \s         # Whitespace. Matches any white space character. (space, tabs and line breaks).
 *   *          # Star. Match 0 or more of the preceeding token.
 *   \)         # Match the literal character ')'
 * )            # End of Group.
 */
const MACRO_TRANSLATIONS_REGEX = /(?:_T\s*\(\s*)(?:(?:'|")|`)(.*?)(?:(?:'|")|`)(?:\s*\))/g;
const RESULT_GROUP             = 1;

// CONSTANTS **********************************************************************************************************/

const EOL      = (process.platform === 'win32' ? /\r\n/ : /\n/);
const UNIX_EOL = '\n';

// FUNCTIONS **********************************************************************************************************/

/**
 * @summary This function gets all the regex matches for a given string, and return the results for the given group.
 *
 * @param string The string apply the regex to.
 * @param regex  The regular expression to be applied.
 * @param index  The group index.
 *
 * @return The matches collection.
 */
function getMatches(string, regex, index) {

    if (!index) {
        index = 1
    }

    var matches = [];
    var match;

    while (match = regex.exec(string)) {
        matches.push(match[index]);
    }

    return matches;
}

/**
 * @summary This function gets all the files (recursively) from a given folder excluding all the files in the
 * EXCLUDED_FOLDERS constant and only including all the files with an extension specified in the INCLUDED_EXTENSIONS
 * constant.
 *
 * @param {string} dir The directory where to get the files from.
 *
 * @return The files collection.
 */
function getAllFiles(dir) {
    var results = [];
    var list    = fs.readdirSync(dir);

    list.forEach(function(file) {

        file = path.resolve(dir, file);

        var stat = fs.statSync(file);

        if (stat && stat.isDirectory() && !isInsideFolder(file, EXCLUDED_FOLDERS)) {
            results = results.concat(getAllFiles(file));
        } else {
            if (hasExtension(file, INCLUDED_EXTENSIONS)) {
                results.push(file);
            }
        }
    });

    return results;
}

/**
 * @summary This function returns true if the given file is inside on of the supplied folder names.
 *
 * @param {string}   file The file name.
 * @param {[string]} The list of folders to validate from.
 *
 * @return True if the file is inside one of the folders, otherwise, false.
 */
function isInsideFolder(file, folderNames) {

    var isInside = false;

    folderNames.some(function(folder) {

        if (file.indexOf(folder) > -1) {
            isInside = true;
            return true;
        }
    });

    return isInside;
}

/**
 * @summary This function returns true if the given file is has one of the supplied file extensions.
 *
 * @param {string}   file The file name.
 * @param {[string]} The list of extensions to validate from.
 *
 * @return True if the file has one of the extensions, otherwise, false.
 */
function hasExtension(file, extensions) {
    var fileExtension = path.extname(file);
    var hasExtension  = false;

    extensions.some(function(extension) {
        if (fileExtension.toUpperCase() === extension.toUpperCase()) {
            hasExtension = true;
            return true;
        }
    });

    return hasExtension;
}

/**
 * @summary Gets all the translatable strings and their locations within the source files.
 *
 * @param {string} fileList The list of files to inspect.
 *
 * @return The list of translatable strings and their locations.
 */
function getAllTranslateables(fileList) {
    var results = [];

    fileList.forEach(function(file) {

        var text = fs.readFileSync(file, 'utf8');

        var lineNumber = 1;
        text.split(EOL).forEach(function (line) {

            var pipeMatches  = getMatches(line, PIPE_TRANSLATIONS_REGEX, RESULT_GROUP);
            var macroMatches = getMatches(line, MACRO_TRANSLATIONS_REGEX, RESULT_GROUP);

            var totalMatcher = pipeMatches.concat(macroMatches);

            if (totalMatcher.length > 0) {
                totalMatcher.forEach(function (trasnlateableText) {

                    if (!results[trasnlateableText]) {
                        results[trasnlateableText] = [];
                    }

                    results[trasnlateableText].push("@file " + file.replace(root, '') + " @line " + lineNumber);
                });
            }

            ++lineNumber;
        });
    });

    return results;
}

/**
 * @summary Generates the translations base file.
 *
 * @param {Array} translatables The list translatables and their locations.
 *
 * @return The file content.
 */
function generetaFile(translatables) {
    var content;

    content = '[' + UNIX_EOL;

    var index    = 0;
    var keyCount = Object.keys(translatables).length;
    for (var key in translatables) {

        if (translatables.hasOwnProperty(key)) {

            // TODO: Comments are illegal in JSON files. So for now we will just skip the location.
            // Will revisit again when the other i18n tools are functional.
            translatables[key].forEach(function(location) {
                content += '    // ' + location + UNIX_EOL;
            });
            content += '    {' + UNIX_EOL;
            content += '       "key":   "' + key + '",' + UNIX_EOL;
            content += '       "value": ""' + UNIX_EOL;
            content += '    }' + (index < (keyCount - 1) ? ',' : '') + UNIX_EOL;
        }

        ++index;
    }

    content += ']' + UNIX_EOL;

    return content;
}

/**
 * @summary Saves the given content on the given file path.
 */
function saveFile(content, path) {
    fs.writeFile(path, content.toString(), function(error) {
        if(error) {
            return console.log(error);
        }

        console.log('Translation base file saved');
    });
}

// ENTRY POINT ********************************************************************************************************/

if (process.argv.length != 4) {
    console.log('USAGE: node generate-translation-base.js <SOURCE_FOLDER> <DESTINATION_FILE>');

    return;
}

var root        = path.resolve(process.argv[2]);
var destination = path.resolve(process.argv[3]);

console.log('Searching for translation entries in: ' + root);

var fileList      = getAllFiles(root);
var translatables = getAllTranslateables(fileList);

console.log(Object.keys(translatables).length + " translatable strings found in " + fileList.length + ' file(s)');

console.log('Generating file...');

var content = generetaFile(translatables);

console.log('File generated');

console.log('Saving file...');

saveFile(content, destination);

console.log('File saved');

console.log('Translation base file created');
