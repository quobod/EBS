# Express BootStrap4 Starter

<ul>
    <li>
        <h3>Description</h3>
        <p>An Express, BootStrap4 starter web application.</p>
    </li>
    <li>
        <h3>About Express Static Assets</h3>
        <ol style="type: I">
            <li>
                <p><b><i>Running the gulp "default" task</i></b> will compile the sass and copy all assets folder to src.</p>
            </li>
            <li>
                <p>Simply copy the assets folders to the  <b><i>Express static path (public)</i></b> --> css, fonts, graphics, js, favicon</p>
            </li>
        </ol>
    </li>
    <li>
        <h3>About the Docs Folder</h3>
        <ol style="type: I">
            <li>
                <p><b><i>Running the gulp "docs" task</i></b> will create/re-create the docs directory</p>
            </li>
        </ol>
    </li>
</ul>

<i>

```
# Installation
git clone https://github.com/quobod/EBS.git or download the zip
cd EBS
yarn install

# Default gulp task --> compiles sass, serves html
# and outputs a src directory
yarn run init-gulp

# Run app in browser and watch multiple directory's file changes
yarn run serve-site

# Re-generates the docs directory
yarn run create-docs
```
</i>
<p><small><b>NOTE: </b></small><hr><small>Executing the gulp docs task <b><i>while the docs directory exists</i></b> will error out on first attempt<b><i> -- re-running the task will successfully generate the docs directory</i></b></p>