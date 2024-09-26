Customerlabs React Test
This repository contains a simple React application created for the Customerlabs coding test. The application demonstrates the implementation of a popup form to create and save a "segment" with specific schema options.

Features
Save Segment Button: A button to open a popup.

Popup Form: When the "Save segment" button is clicked, a popup appears with:

A text box to enter the segment name.
A dropdown with predefined schema options like "First Name", "Last Name", etc.
A link to add new schema options dynamically to the segment.
Add Schema to Segment: Users can select schema options from the dropdown and dynamically add more options by clicking on the "+Add new schema" link. The dropdown is reset after each selection, showing only unselected options.

Save the Segment: After adding the schema options, the user can click the "Save segment" button to submit the data in the following format:

Instructions to Run the Application

Clone the repository:
git clone https://github.com/yourusername/customerlabs-react-test.git
cd customerlabs-react-test

Install the dependencies:
npm install

Start the development server:
yarn start
The application will be available at http://localhost:3000.

Popup Form Functionality:
Save Segment: Click this button to open the popup form.
Text Box: Enter the segment name.
Dropdown: Choose from the available schema options.
+Add New Schema: Add multiple schema options. The dropdown refreshes with unselected options.
Submit: Clicking the "Save segment" button will send the selected segment and schema to the webhook.

NOTE: FIrst click on dropdown then select the value which you want (Eg: First Name) after that only click on the +Add New schema button so that it will add the new json schema in the UI.

Sending Data to Server:
The data will be sent to a webhook URL using webhook.site. You can replace the webhook URL in the code to test your own endpoint.
