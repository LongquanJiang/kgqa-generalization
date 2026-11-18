# Collection of Generalizable KGQA Methods
![Database validation](https://github.com/longquanjiang/kgqa-generalization/actions/workflows/main.yml/badge.svg)
![Test](https://github.com/longquanjiang/kgqa-generalization/actions/workflows/test.yml/badge.svg)
![Database validation](https://github.com/longquanjiang/kgqa-generalization/actions/workflows/deploy.yml/badge.svg)
[![Check code cleanliness](https://github.com/longquanjiang/kgqa-generalization/actions/workflows/linter.yml/badge.svg)](https://github.com/longquanjiang/kgqa-generalization/actions/workflows/linter.yml)


### Website: https://longquanjiang.github.io/kgqa-generalization/
This is an exploration and visualisation website for a categorization of Generalizable KGQA papers, hosted on Github pages. The initial set of Generalizable KGQA papers was collected as part of a large-scale literature review on the evaluation of KGQA Generalization. This website provides an interactive way to [explore the dataset](https://longquanjiang.github.io/kgqa-generalization/#/papers), and we invite the community to extend the Generalizable KGQA dataset in order to make this a living and curated collection of Generalizable KGQA methods. 

If you want to add a Generalizable KGQA paper to the database, follow the instructions below.

## Add a paper
- Fork this repository by clicking the fork button in the top right.
- Go to https://longquanjiang.github.io/kgqa-generalization/#/add-paper and fill in the form to generate a database entry (will be shown on the right side of the webpage).
- Edit the file ```src/db/db.json``` in your fork.
- After the final entry's '}' (and before the final ']') append the JSON code copied from our website.
- Commit the changes. The current naming convention for the commit is as follows, the title of the commit should remain "update db.json" and in the commit message please include the title, the link to the paper, and the authors of the paper you added.
- Create a new pull request from your forked repository to the main repository. 
- When your pull request is approved and passes the automated tests, it will be merged and your paper will show up on the website.

## Review a pull request
To review a pull request, follow these steps:
- Go to the pull request section of the main GitHub.
- Click a pull request that still requires reviews with "update db.json" as the title.
- Go to the Files Changed section of the pull request.
- Check if the entry into the database is correctly formatted and has the correct tags or that a valid reason for removal is provided.
- Click the review changes button, if everything is correct click approve, otherwise reject and provide an explanation why the proposed changes were rejected. 
