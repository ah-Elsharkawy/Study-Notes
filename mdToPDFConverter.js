const fs = require("fs");
const path = require("path");
const { exec } = require("child_process");

// Get the directory from the command-line arguments
const directory = process.argv[2];

if (!directory) {
  console.error("Please provide a directory as an argument.");
  process.exit(1);
}

function convertMdToPdf(dir) {
  // Read all files and directories
  fs.readdir(dir, (err, files) => {
    if (err) throw err;
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      fs.stat(filePath, (err, stats) => {
        if (err) throw err;
        if (stats.isDirectory()) {
          // Recursively call for subdirectories
          convertMdToPdf(filePath);
        } else if (filePath.endsWith(".md")) {
          const pdfFile = filePath.replace(".md", ".pdf");
          exec(
            `pandoc "${filePath}" -o "${pdfFile}"`,
            (err, stdout, stderr) => {
              if (err) {
                console.error(`Error converting ${filePath}:`, stderr);
              } else {
                console.log(`Converted ${filePath} to ${pdfFile}`);
              }
            }
          );
        }
      });
    });
  });
}

convertMdToPdf(directory);
