# demo_requirements.md

## Project Goal
Build a **demo email follow-up automation** for a luxury automotive sales representative at Porsche Centre Trinidad.

This is a **tailored demo**, not a production deployment. The objective is to show how lead inquiries can be captured, organized, scored, and followed up automatically using polished, premium-brand email communication.

---

## Primary Outcome
The finished demo should clearly show how the system can:

- capture new leads
- personalize follow-up emails
- segment leads by vehicle interest and inquiry type
- score lead intent
- send timed follow-up emails
- stop automation when a lead replies
- flag high-intent leads for manual outreach
- present all lead activity in a simple dashboard or lead tracker

---

## Demo Context
Use the information in `prospect_context_steffan_semurath.md` as the source of truth for:
- prospect details
- brand tone
- personalization values
- workflow assumptions
- lead schema
- messaging direction

---

## What to Build

### 1. Lead Capture Layer
Build a sample lead intake structure that accepts:

- first name
- last name
- email
- phone
- vehicle interest
- inquiry type
- preferred contact method
- timeline to purchase
- budget range
- trade-in interest
- test drive interest
- notes
- lead source
- created at timestamp

### Requirements
- Include validation for required fields
- Normalize dropdown/select field values
- Save leads into a mock datastore, JSON file, or simple database
- Generate a unique lead ID for each record

---

### 2. Lead Scoring Engine
Build logic that classifies leads as:

- Hot
- Warm
- Cold

### Example Rules
#### Hot Lead
- test drive requested
- timeline is immediate
- financing inquiry present
- trade-in interest is yes

#### Warm Lead
- pricing inquiry
- availability inquiry
- timeline within 1 to 3 months

#### Cold Lead
- general inquiry only
- just researching
- no response after multiple follow-ups

### Requirements
- Make rules easy to edit
- Return both a numeric score and a label
- Apply tags automatically based on the score

---

### 3. Tagging System
Create a tagging layer with tags such as:

- New Lead
- Porsche Inquiry
- Macan Interest
- Cayenne Interest
- 911 Interest
- 718 Interest
- Taycan Interest
- Test Drive Requested
- Financing Inquiry
- Trade-In Lead
- Hot Lead
- Warm Lead
- Cold Lead
- No Response
- Manual Follow-Up Needed

### Requirements
- Tags should be added automatically from lead inputs
- Tags should update when lead status changes
- Tags should be visible in the lead record or dashboard

---

### 4. Email Automation Engine
Build a sequence with 3 emails.

#### Email 1
- send immediately after lead capture
- confirm inquiry
- acknowledge the selected vehicle
- invite reply

#### Email 2
- send 24 to 48 hours later if no reply
- short follow-up
- premium and polite tone

#### Email 3
- send 4 to 7 days later if still no reply
- soft re-engagement
- low pressure

### Requirements
- Use personalization variables
- Use premium tone aligned with Porsche/luxury sales
- Make subject lines editable
- Support branching by inquiry type
- Stop future emails once the lead replies

---

## Personalization Variables
Support variables including:

- `{{first_name}}`
- `{{last_name}}`
- `{{vehicle_interest}}`
- `{{inquiry_type}}`
- `{{timeline_to_purchase}}`
- `{{sales_rep_name}}`
- `{{dealership_name}}`
- `{{phone_number}}`
- `{{email}}`
- `{{location}}`

### Static Values
Use these defaults:
- `sales_rep_name`: Steffan Semurath
- `dealership_name`: Porsche Centre Trinidad
- `phone_number`: 868 752 1398
- `email`: ssemurath@lsmtnt.com
- `location`: Don Miguel, San Juan, Trinidad and Tobago

---

## Branching Logic

### If inquiry type = test drive
- prioritize the lead
- adjust the email CTA to request preferred date/time
- notify the sales rep

### If inquiry type = financing
- acknowledge financing interest
- mark lead as higher intent
- suggest direct follow-up

### If inquiry type = trade-in
- ask for current vehicle details
- mark lead for manual sales rep review

### If vehicle = Taycan
- optionally emphasize innovation and electric performance

### If vehicle = 911 Carrera S
- optionally emphasize heritage and performance

---

## 5. Reply Handling Logic
Create a simple mechanism to simulate reply handling.

### Requirements
- If the lead replies, mark status as `Responded`
- Stop the remaining automation sequence
- Add tag: `Manual Follow-Up Needed`
- Trigger a sales rep notification event

If real inbox integration is not being built, simulate this using:
- a manual toggle
- a dashboard button
- a mock webhook event
- a status change in the datastore

---

## 6. Lead Tracker / CRM View
Build a simple internal dashboard or tracker view.

### Show:
- total leads
- new leads
- hot leads
- leads by vehicle interest
- pending follow-ups
- responded leads
- no-response leads
- recent activity log

### Lead Record View Should Include
- lead ID
- contact info
- model interest
- inquiry type
- score
- tags
- current status
- last email sent
- next scheduled email
- reply status
- notes

---

## 7. Notification Logic
Trigger notification events when:
- a hot lead is created
- a test drive is requested
- a financing inquiry is submitted
- a lead replies
- a lead is marked for manual follow-up

### For Demo Purposes
Notifications can be shown as:
- console logs
- mock email alerts
- dashboard alerts
- activity feed items

---

## 8. Activity Logging
Every lead action should be logged.

### Log Events
- lead created
- lead scored
- tags applied
- email 1 sent
- email 2 sent
- email 3 sent
- lead replied
- automation stopped
- notification triggered

### Requirements
- Each event should include timestamp
- Each event should be associated with a lead ID
- Activity should appear in dashboard or log output

---

## Technical Expectations

### Preferred Build Style
Claude Code should aim for a demo that is:
- easy to understand
- visually clean
- logically structured
- easy to modify later
- not overengineered

### Acceptable Stack Options
Use whichever is fastest and cleanest for demo purposes, for example:
- simple Node.js app
- React front end with mock backend
- Next.js demo app
- JSON datastore
- SQLite
- Airtable-style mock data structure

### Important
Do not build anything that depends on:
- real Porsche APIs
- real email inbox access
- real CRM credentials
- real inventory systems
- private dealership tools

Everything should be mock/demo-safe.

---

## UI Expectations
If building a frontend, keep the visual tone:
- premium
- minimal
- elegant
- dark or neutral palette
- high-end automotive feel
- uncluttered

### Suggested Pages or Panels
- Lead Intake Form
- Lead Dashboard
- Lead Detail View
- Activity Feed
- Email Template Preview
- Automation Status Panel

---

## Email Copy Requirements
All email copy should:
- sound premium
- be short and polished
- feel human
- avoid sounding like generic marketing automation
- fit luxury automotive sales

Do not use:
- aggressive sales language
- excessive exclamation marks
- low-end promotional wording
- long paragraphs

---

## Demo Narrative to Support
The product should visually and logically demonstrate this story:

> A new Porsche lead comes in. The system immediately captures the inquiry, classifies the lead, sends a polished confirmation email, schedules the next follow-up, and keeps the sales rep informed when the lead becomes high priority or replies.

---

## Suggested Sample Leads
Include a few preloaded demo leads such as:

### Lead 1
- first name: Daniel
- last name: Ali
- vehicle interest: Porsche Macan
- inquiry type: pricing request
- timeline: within 1 month
- trade-in interest: no
- test drive interest: yes

### Lead 2
- first name: Alicia
- last name: Mohammed
- vehicle interest: Porsche Taycan
- inquiry type: financing inquiry
- timeline: immediately
- trade-in interest: yes
- test drive interest: no

### Lead 3
- first name: Ryan
- last name: James
- vehicle interest: Porsche 911 Carrera S
- inquiry type: general question
- timeline: just researching
- trade-in interest: no
- test drive interest: no

---

## Functional Deliverables
Claude Code should generate:

1. lead intake form or mock input method  
2. lead scoring logic  
3. automated tagging  
4. 3-step email sequence  
5. reply-stop logic  
6. dashboard or lead tracker  
7. activity log  
8. sample data  
9. editable email templates  
10. clean demo-ready presentation flow  

---

## Nice-to-Have Features
If time permits, include:
- manual resend email button
- mark as contacted button
- timeline/status view per lead
- preview of all scheduled automation steps
- filter by model
- filter by lead temperature
- simple analytics cards

---

## Success Criteria
The demo is successful if someone viewing it can instantly understand:

- what problem it solves
- how leads flow through the system
- how personalization works
- how follow-up is automated
- how high-intent leads are surfaced
- how this could help a luxury car salesperson save time and improve lead conversion

---

## Non-Negotiables
- Keep it demo-safe
- Keep it premium
- Keep it simple
- Keep the logic easy to explain
- Do not imply real integration with Porsche systems
- Do not use fake claims about dealership performance
- Do not overcomplicate the architecture

---

## Final Instruction to Claude Code
Build the demo as if it will be shown in a short screen-recorded walkthrough for a luxury automotive sales prospect. Prioritize clarity, polish, believable workflow, and a strong visual/business explanation over technical complexity.