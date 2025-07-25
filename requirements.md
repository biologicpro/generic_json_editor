What it does

i want to do a simple web app, which can configure the json with color pallete suggestion from
an image.

How it does :

A1. user select 1 of template to work, the template json are located under json_templates.
A2. the app parse the json, and expose the field of color, string, path,array, whatever values to a input controls.
A3. user can tweak the values in the the exposed input controls, and save the value changed json to local.
A4. for the color control, provide the color selection tool ( could use some js lib which has rgb,hls, screen color selection)
A5. There are helper tools tabs, which provide some helper tools.

How is the UI:

B1. a select input to allow user to choose the json from json_templates to works with.
B2. the json pretty viewer/editor, can change its value inline with proper input (related to A2)
B3. related to A5 :in the helper tools tabs: an image uploader, accept url,drag, or open dialgue to upload from local, and generate 10 color pallete from the image.
B4. related to A5 :in the helper tools tabs: an randomizer : generate a serie of random colors and assignate them to those color inputs.
B5. related to A5 :in the helper tools tabs: list those color with name, preselected from the site : https://nipponcolors.com/
