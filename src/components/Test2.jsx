/*
DESCRIPTION: 
Your task that is to write a function that accepts the input string 
(formatted with Markdown) and outputs the output string (formatted with HTML).

A few notes:
- Please take 5-10 minutes before writing any code to talk through your approach.
- You only have to handle the formatters that occur in the example, namely:
  paragraphs, blockquotes, strikethroughs, newlines
- You make use any language or environment of your choice. You are also free to use Google. 

EXAMPLE INPUT
This is a paragraph

And this is a paragraph that has
some line breaks and a blockquote 
> in the latter half. And nothing
> else besides some more filler.
There is also an additional final line with
some ~~strikethrough~~.

EXAMPLE OUTPUT
<p>This is a paragraph</p>

<p>And this is a paragraph that has<br>some line breaks and a blockquote</p>

<blockquote>in the latter half. And nothing<br> else besides some more filler.</blockquote>

<p>There is also an additional final line with<br> some <s>strikethrough</s>.</p>
*/

const _ = require('lodash');
let str = 'This is a paragraph\n\nAnd this is a paragraph that has\nsome line breaks and a blockquote \n> in the latter half. And nothing\n> else besides some more filler.\n\nThere is also an additional final line with\nsome ~~strikethrough~~.'
function sayHello(str) {
  return str.split('\n')
  return splitStr
  let bqIsOpen = false
  let paragraphIsOpen = false
  let newStr = '<p>'
  // console.log(str);
  let paragraphTag = '</p><p>'
  for(let i = 0; i <str.length; i++){
    if (str.charAt(i) === '\n'){
      if (str.charAt(i+1) === '>'){
        if (bqIsOpen){
          newStr += '<br>'
        } else{
          newStr += "<blockquote>"
          bqIsOpen = true
        }
      } else {
        if (str.charAt(i+1) === '\n'){
          if (bqIsOpen){
            newStr += '</blockquote>'
            bqIsOpen = false
          } else if (paragraphIsOpen){
            newStr += '</p>'
            paragraphIsOpen = false
          }
        }
      }
    }
    if(str.charAt(i) === '\n' && str.charAt(i+1) === '\n'){
        newStr += '</p><p>'
        i++
      }else if(str.charAt(i) === '\n'){
      newStr += '<br>'
    }
    newStr += str.charAt(i)
  } 
return newStr + '</p>'
}
/*
1. how you parse the string - char by char, line by line -> char by char
2. StringBuilder or in place replacement



*/

console.log(sayHello(str))
