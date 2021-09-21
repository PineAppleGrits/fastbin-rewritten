#  Paste service hosted by Grits!

Painless, self-hosted, modern alternative to [Hastebin](https://hastebin.com/).

## How to Use

Just paste your code or text, click save, and you're ready to go! You can also
select a programming language from the dropdown. You can click on the **Raw**
button to view only the contents, without any UI stuff.

fastbin uses [Monaco](https://microsoft.github.io/monaco-editor/) as its editor,
which is the editor used by Visual Studio Code. This offers great functionality
and syntax highlighting support.

You can also clone a document using the **Clone** button.

When viewing documents, the syntax highlighter works based on the ending of the
URL. For example, if I have a JavaScript file with the key "foobar", I can
append ".js" to the end of the URL and it will highlight it as JavaScript.
Appending .js to the raw URL will obviously not work, it expects only the key to
be provided.

Once you create a snippet, you will be given a link that you can use to delete
it from fastbin. This link will only ever be displayed ONCE, so make sure to
save it somewhere safe in case you want to delete your snippet later.