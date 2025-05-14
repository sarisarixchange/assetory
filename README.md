# Adding Data to the Assetory

## Initial Setup (only the first time)

The following steps to set up Vue are done once. Run the following commands in the project using the VS Code terminal:


### Clone the assetory repository (folder) to your computer

```sh
git clone https://github.com/sarisarixchange/assetory.git
cd assetory
```

### Install Node.js

Ensure Node.js is installed on their system. You can check by running:

```sh
node -v
npm -v
```

If not installed, follow these steps:

- Windows: Download the Node.js ZIP from [Node.js official site](https://nodejs.org/en/download), extract it, and install it following the installation wizard.
- macOS: Download the Node.js pkg from [Node.js official site](https://nodejs.org/en/download) and install it following the installation wizard.

### Install Git

Ensure Git is installed on their system. You can check by running:

```sh
git --version
```

If not installed, follow these steps:

- Windows: Download Standalone Installer from [Git official site](https://git-scm.com/downloads/win), and install it following the installation wizard. When you reach the screen "Adjusting your PATH environment", select the option: "Git from the command line and also from 3rd-party software".

macOS: Type git in the terminal, then click install in the prompt asking if you want to install Command Line Developer Tools.

    If the above Git installation steps for macOS don't work, type the following in the terminal:

    ```sh
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
brew install git
git --version
    ```


### Install Project

```sh
npm install
```

##  Modify the Project Locally (Each time you modify the codebase)

The following steps are followed each time you modify the project codebase. 

### Open the Project Folder in VS Code

Start by opening the project folder by going to VS Code > File > Open Folder and choosing the project folder. 

###  Run the Project Locally

Open the VS Code terminal and run the following commands in the project using the VS Code terminal:

```sh
npm run dev
```

This will start the Vite development server, and the project will be accessible at the URL provided in the terminal (e.g., http://localhost:3000).

### Compile for Publishing the Website

```sh
npm run build
```

### Modify collections.json

The collaborator can edit the file collections.json to add or modify collections. For example:

{
  "id": 4,
  "title": "New Collection",
  "thumbnail": "new-collection/thumbnail.png",
  "bannerImage": "new-collection/banner.png",
  "cards": [],
  "assets": []
}

 ## Add images to /public/images/

Go to public/images to add images for your collections. Create sub-folders for better organization.

### Commit and Push Changes

```sh
git add src/data/collections.json public/images/
git commit -m "Add new collection and images"
git push origin main
```

### Publsish website to GitHub Pages

To deploy the changes to GitHub Pages, they can run:


```sh
npm run deploy
```