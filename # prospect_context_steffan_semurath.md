# prospect_context_steffan_semurath.md

## Objective
Build a demo email follow-up automation tailored to a luxury automotive sales representative in Trinidad and Tobago. The purpose of this demo is to show how automated follow-up can help convert vehicle inquiries into showroom visits, test drives, and sales conversations.

This is a **demo environment only** and should not imply access to any private dealership systems, customer records, or internal Porsche tools.

---

## Prospect Identity

### Basic Details
- **Name:** Steffan Semurath
- **Instagram Handle:** steffanatporsche
- **Role:** Porsche Brand Ambassador
- **Associated Brand:** Porsche Centre Trinidad
- **Country:** Trinidad and Tobago

### Public Contact Information
- **Mobile:** 868 752 1398
- **Email:** ssemurath@lsmtnt.com
- **Dealer Page:** dealer.porsche.com/tt/trinidad

### Business Address
Cor. Bhagoutie Trace and Churchill Roosevelt Highway  
Don Miguel, San Juan  
Trinidad and Tobago

---

## Public Profile Signals

### Instagram Stats
- **Posts:** 499
- **Followers:** 2,059
- **Following:** 764

### Visible CTA Options
- Follow
- Message
- Contact

### Featured Vehicle Highlights
The profile highlights indicate active promotion of:
- Cayenne
- Macan
- 911 Carrera S
- 718 Cayman
- Taycan

---

## Demo Positioning
This demo should be presented as:

> A premium lead follow-up automation for luxury automotive sales that helps a Porsche representative respond faster, stay consistent, and nurture more inquiries into real appointments.

---

## Intended Use Case
This automation is designed for a sales rep who may receive inbound interest from:
- Instagram messages
- website inquiries
- phone calls
- showroom walk-ins
- referral traffic
- manual lead entry

The automation should help organize and follow up with these leads in a consistent and professional way.

---

## Business Problem
Potential leads may be lost when:
- follow-up takes too long
- lead handling is inconsistent
- no structured nurture process exists
- hot prospects are not identified quickly
- leads stop replying after the first interaction

In luxury automotive sales, speed and quality of follow-up directly affect conversion.

---

## Desired Demo Outcome
The demo should make the prospect feel:

- this was built specifically for someone in my role
- this would save me time
- this would help me look more professional
- this would help me stay on top of leads
- this could help me book more appointments and test drives

---

## Demo Assumptions
The following are **assumptions for demo purposes only**:
- The prospect handles inbound vehicle inquiries.
- Prospects may ask about pricing, availability, financing, or test drives.
- A structured follow-up process would improve lead response handling.
- Different models should trigger different messaging paths.
- High-intent leads should be prioritized for manual outreach.

Do not present these assumptions as verified facts.

---

## Boundaries
Do **not** claim any of the following:
- access to internal Porsche systems
- access to dealership inventory software
- access to the prospect's CRM
- access to real customer data
- access to lead history
- access to internal pricing tools

Keep the demo framed as a **tailored sample automation**.

---

## Brand/Tone Requirements
The messaging tone should feel:
- premium
- professional
- polished
- concise
- warm
- helpful

The messaging should **not** feel:
- robotic
- cheap
- pushy
- spammy
- overly long
- generic

---

## Core Automation Concept

### Workflow Summary
1. A new lead is captured.
2. The lead is categorized by model interest and inquiry type.
3. An immediate confirmation/follow-up email is sent.
4. If the lead does not reply, timed follow-up emails are sent.
5. High-intent leads are flagged.
6. Activity is logged to a simple lead tracker or CRM.
7. The rep can manually take over at any point.

---

## Suggested Trigger Sources
Use one or more of these as demo inputs:
- website contact form
- Instagram lead form
- manual lead entry form
- showroom inquiry form
- WhatsApp capture form
- CSV import of leads

---

## Lead Data Schema

### Required Fields
- `first_name`
- `last_name`
- `email`
- `phone`
- `vehicle_interest`
- `inquiry_type`
- `preferred_contact_method`
- `timeline_to_purchase`
- `budget_range`
- `trade_in_interest`
- `test_drive_interest`
- `notes`
- `lead_source`
- `created_at`

### Example Vehicle Options
- Porsche Macan
- Porsche Cayenne
- Porsche 911 Carrera S
- Porsche 718 Cayman
- Porsche Taycan

### Example Inquiry Types
- pricing request
- availability request
- book a test drive
- financing inquiry
- trade-in inquiry
- general question

### Example Preferred Contact Methods
- email
- phone
- WhatsApp

### Example Timeline Options
- immediately
- within 1 month
- within 3 months
- just researching

---

## Personalization Variables
Use these variables in templates:

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

### Recommended Static Values
- `{{sales_rep_name}}` = Steffan Semurath
- `{{dealership_name}}` = Porsche Centre Trinidad
- `{{phone_number}}` = 868 752 1398
- `{{email}}` = ssemurath@lsmtnt.com
- `{{location}}` = Don Miguel, San Juan, Trinidad and Tobago

---

## Automation Logic

### Lead Scoring Rules
Assign example priority levels:

#### Hot Lead
Trigger when:
- inquiry type is `book a test drive`
- timeline is `immediately`
- trade-in interest is yes
- financing inquiry is yes
- multiple interactions occur

#### Warm Lead
Trigger when:
- pricing requested
- availability requested
- timeline is within 1-3 months

#### Cold Lead
Trigger when:
- general question only
- just researching
- no response after multiple touchpoints

---

## Suggested Tags
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

---

## Email Sequence Structure

### Sequence Goal
Keep the lead engaged without sounding aggressive. The sequence should feel like premium concierge-style follow-up.

---

## Email 1: Immediate Confirmation

### Timing
Immediately after inquiry

### Goal
Acknowledge the inquiry and keep momentum

### Subject Line Ideas
- Thank you for your interest in Porsche Centre Trinidad
- We’ve received your Porsche inquiry
- Let’s help you find the right Porsche

### Content Intent
- thank the lead
- acknowledge the model they asked about
- offer help with pricing, availability, or next steps
- invite reply
- offer showroom visit or test drive if relevant

### Example Template
Hello {{first_name}},

Thank you for your interest in the {{vehicle_interest}} at Porsche Centre Trinidad.

We’ve received your inquiry and would be happy to assist with pricing, availability, or arranging a visit to the showroom. You’re welcome to reply to this email with any questions, or let us know if you’d like to discuss next steps.

Kind regards,  
{{sales_rep_name}}  
Porsche Brand Ambassador  
{{dealership_name}}  
{{phone_number}}  
{{email}}

---

## Email 2: Short Follow-Up

### Timing
24 to 48 hours later if no reply

### Goal
Prompt a response without pressure

### Subject Line Ideas
- Just following up on your Porsche inquiry
- Still interested in the {{vehicle_interest}}?
- Available to assist with your Porsche search

### Content Intent
- polite check-in
- restate availability to assist
- keep email short
- reinforce premium service

### Example Template
Hello {{first_name}},

Just following up regarding your interest in the {{vehicle_interest}}.

I’d be happy to assist with any questions you may have, whether around availability, pricing, or arranging a showroom visit. Feel free to reply whenever convenient.

Kind regards,  
{{sales_rep_name}}

---

## Email 3: Soft Re-Engagement

### Timing
4 to 7 days later if still no reply

### Goal
Keep the door open elegantly

### Subject Line Ideas
- Here when you’re ready
- Happy to assist whenever the time is right
- Keeping the conversation open

### Content Intent
- low-pressure re-engagement
- preserve brand tone
- avoid sounding salesy

### Example Template
Hello {{first_name}},

Just keeping the conversation open in case you’re still considering the {{vehicle_interest}}.

Whenever you’re ready, I’d be glad to assist with any questions or help arrange a visit to Porsche Centre Trinidad.

Best regards,  
{{sales_rep_name}}

---

## Optional Branching Logic

### If Inquiry Type = Test Drive
Adjust the first email CTA to:
- propose a showroom visit
- ask for preferred day/time
- offer to coordinate next steps

### If Inquiry Type = Financing
Adjust the messaging to:
- acknowledge financing interest
- mention assistance is available
- invite discussion around options

### If Inquiry Type = Trade-In
Adjust the messaging to:
- invite trade-in details
- ask for current vehicle info
- signal that valuation discussion can begin

### If Vehicle Interest = Taycan
The tone can lightly emphasize:
- innovation
- performance
- electric mobility
- premium driving experience

### If Vehicle Interest = 911 Carrera S
The tone can lightly emphasize:
- iconic performance
- driver engagement
- sports car heritage

---

## CRM / Lead Tracker Actions

### On Lead Capture
- create lead record
- apply tags
- assign priority score
- store source and inquiry details
- send email 1

### On No Reply
- wait defined time
- send email 2
- update status to follow-up sent

### On Continued No Reply
- send email 3
- mark as low activity or nurture

### On Positive Reply
- stop automated sequence
- assign to manual follow-up
- notify sales rep

---

## Notification Logic
The sales rep should be notified when:
- a lead books a test drive
- a lead replies positively
- a lead is marked hot
- a lead asks about financing
- a lead requests direct contact

---

## Demo UI / Dashboard Ideas
If a front end or internal dashboard is included in the demo, it can show:

- total new leads
- leads by model interest
- hot leads
- pending follow-ups
- leads awaiting reply
- booked test drive requests
- latest activity log

---

## Demo Narrative
Use this narrative when presenting the automation:

> Imagine someone inquires about a Porsche Macan through your website or from a social media campaign. Instead of that lead sitting idle or requiring manual follow-up every time, the system immediately sends a polished branded response, logs the inquiry, tags the lead based on intent, and continues the follow-up automatically until the person replies or is ready for direct outreach.

---

## Key Selling Points for the Demo
Emphasize:
- faster response time
- more consistent lead handling
- premium customer experience
- less manual follow-up workload
- better organization of inquiries
- improved chances of converting interest into appointments

---

## What This Demo Should Prove
This demo should prove that an automation system can:
- personalize follow-up at scale
- maintain brand quality
- save time
- prevent leads from going cold
- improve the structure of sales follow-up

---

## File Usage Notes
This markdown file is meant to be used as context for Claude Code while generating:
- demo automations
- email templates
- sample CRM workflows
- lead capture schemas
- mock dashboards
- follow-up logic

The system should treat all information here as **public-context-based demo guidance**, not confidential operational truth.