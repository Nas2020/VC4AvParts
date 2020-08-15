<h1 align="center">
   VC4AvParts
</h1>
<p align="center">
  Verifiable Credential for Aviation Parts, using Hyperledger indy(Souvrin) and ACA-Py . Presented as capstone project - dApp II for <a href='https://www.georgebrown.ca/programs/blockchain-development-program-t175/'>Blockchain Development</a> program from <a href='https://www.georgebrown.ca'>George Brown College</a>.
</p>

<p align="center">
   For pitch deck, please check <a href=''>Presentaion slides</a> folder.
</p>



## Background

Unapproved parts are one of the major issues in Aviation Industry. A bogus part even seemingly in-significant one, if put into an Airplane could lead to catstrophic failure. Despite all the efforts from authorities to mitigate this, fake parts keep flowing into the Industry. 

[FAA Unapproved Part Notification Year-2020](https://www.faa.gov/aircraft/safety/programs/sups/upn/2020/) - Two Notifications already this year! AND 
[EASA Unapproved Part Notification No: 2206400-2 Year-2019](https://www.easa.europa.eu/domains/aircraft-products/suspected-unapproved-parts/air-cycle-machine-1) - Forged FAA Certificate!!!

As per the evidence provided above, It clearly reveals that the current paper based process to prove authentictiy of Aircraft is not very effective. According to an FAA Report, the "FAA's" process for monitoring and investigating SUPs is not as effective as it could be, because of recordkeeping weaknesses and the lack of a management control to capture and accurately report the number of SUPs." This, from a report by the Office of Inspector General titled "ENHANCEMENTS ARE NEEDED TO FAA'S OVERSIGHT OF THE SUSPECTED UNAPPROVED PARTS PROGRAM 2.[Source](https://www.aviationsuppliers.org/COUNTERFEIT-AND-UNAPPROVED-AIRCRAFT-PARTS-STATUS)

In conclusion, There should be an alternate solution for this. 

## Verifiable Credential / Self-Sovereign Identity

Introduction of Blockchain in the year 2009 has changed many aspects of trust issue in the digital world. This innovation led the digital community to think about SSI and VC opportunities to improve Trust Over IP. And W3C DID standardizastion process would make all these different protocols comes under same unmbrella. Now, it seems by implemeting Distributed Ledger Technology into digital world could mitigate tampreing of document and moreover proving authenticity of it immediate. 

## VC4AvParts App [ Verifiable Credential For Aviation Parts]

Bringing W3C Verifiable Credential data model into Aviation SUP mitigation process singnificantly improve effectivity of it. Authorities would be able to track and eliminate potential fake parts pouring into Aerospace sector, therefore increase Air transport safety globally. Blockchain technologies like Hyperledger Indy nodes (sovrin) and Aries Cloud Agent - Py makes this implementation much faster.

The VC4AvParts Application is built on top of open standards such as W3C DID and VC Datamodel. It levereged Sovrin for node and ACA-py for cloud agent. App acts as an user agent between the issuer, holder and verifier. 

<p align="center">
   <img src="https://res.cloudinary.com/deayf8zdf/image/upload/v1597396240/SolutionExplainer_bmdtbj.jpg"/>
   <p align="center"><b>High-Level Overview</b></p>
</p>

### How the Application implementation process works in real-life


1. <b>Onboarding of National Avaition Authority</b>

``` sh
    Once onboarded, Aviation Authority creates standard schema to define credential and create verification policies based on those schemas to verify the credential.
```

2. <b>Onboarding of organizations</b>

``` sh
    Admin performs onboarding other entities like issuers/holders/verifiers based on National Aviation registry of Approved organisations.
    (that means, only registered and approved organisations or individual only can be onboarded).
    During onboarding process, an issuerDID will be created and written into sovrin ledger and Organisation will be given Login Credential by admin.
```
3. <b>Organization accessing the platform</b>

``` sh
    Organisation will be able to signin with the login credential issued during onboarding process. Once access is granted, organosation may create connection(peer-to-peer), wallets, credential definitions, verification policies, issue certificates, accept certificates, verify certificates  selective disclosure of data etc depends on the role of that particular orgnisation.
```

4. <b>Type of roles for organisation takes</b>

``` sh
    issuer organisation : Define credential based on the schema provided by Avaition Authority. Create connection if required (this connection would let the organisation to create secure peer2peer channel for communication). Create a cloud wallet (This wallet will be keeping all the credentials related their aircraft parts)

    Holder organization : Create a cloud wallet (This wallet will be keeping all the credentials related their aircraft parts). Create connection if required (this connectoin would let the organisation to create peer2peer channel for communication).

    Verifier organisation : create verification policy based on schema provided by aviation authority. Create connection if required (this connectoin would let the organisation to create peer2peer channel for communication)

    Note: Individual organisation can take any number of roles out of those three.
```

### How the issuing, recieving and Verifying certifcates to Aircraft parts work

<p align="center">
   <img src="https://res.cloudinary.com/deayf8zdf/image/upload/v1597466227/FlowChart_ky7osm.png"/>
   <p align="center"><b>Issue-Recieve User Story</b></p>
</p>

<p align="center">
   <img src="https://res.cloudinary.com/deayf8zdf/image/upload/v1597467261/FlowChart_1_ogsjf9.png"/>
   <p align="center"><b>Verification User Story - Scenario 1</b></p>
</p>

<p align="center">
   <img src="https://res.cloudinary.com/deayf8zdf/image/upload/v1597467866/FlowChart_2_lqqsm1.png"/>
   <p align="center"><b>Verification User Story - Scenario 2</b></p>
</p>

## VC4AvPart Application

Application is Proof Of Concept. And still initial stages of developement. A simple demostration of the demo as given below and also avaliable on youtube <a href='https://www.youtube.com/watch?v=4r6wEUt_aIA'>click here for demo video</a> Code is available on frontend and backend folder.


## Demo: Onboarding an organisation
<p align="center">
  <img src="https://res.cloudinary.com/deayf8zdf/video/upload/c_scale,h_398,q_auto/v1597389515/VC4AvParts_la7gta.gif"/>
</p>


## How to run the demo

``` sh
   1. gitclone the repository to local drive
   2. terminal 1 npm install
   3. terminal 2 cd backend
   4. npm install
   5. change .env-dev to .env
   6. terminal 2 -> nodemon
   7. terminal 1 -> npm start
```

## :book: Resources and technologies :computer:


2. Backend

   - [Express.js](http://expressjs.com/) - web application framework
   - [Async](https://caolan.github.io/async/v3/) - library to perform asynchronous operations
   - [Express validator](https://express-validator.github.io/docs/) - middleware to validate data
   - [Bcryptjs](https://www.npmjs.com/package/bcryptjs) - library to perform cryptography
   - [JWT. IO](https://jwt.io/) - JSON Web Tokens to allow, decode, verify and generate JWT
   - [Dotenv](https://www.npmjs.com/package/dotenv) - loads environment variables from a .env file
   - [Trinsic](https://trinsic.id/)- to access trinsic SDK
   - [nodemailer](https://nodemailer.com/about/) - module for node.js applications to send email.
   - [cors](https://enable-cors.org/server_expressjs.html) - standard mechanism that can be used by all browsers for implementing cross-domain requests.

3. Frontend

   - [Rimble](https://rimble.consensys.design/) - design system
   - [ReactJS](https://reactjs.org/) - frontend library
   - [React router dom](https://www.npmjs.com/package/react-router-dom) - routing and navigation for react apps.
   - [React-cookie](https://www.npmjs.com/package/react-cookie) - cookie interaction for React applications.
   - [qrjs2](https://www.npmjs.com/package/qrjs2) - to generate QR code
   - [Axios](https://www.npmjs.com/package/axios) - HTTP requests
   - [styled-components](https://rimble.consensys.design/components/rimble-ui) - React components for the Rimble Design System.

## credits

- [Trinsic](https://trinsic.id/trinsic-studio/) - End-to-End decentralized identity platform.
- Professor Dave and Professor Dhruvin @ [George Brown College](https://www.georgebrown.ca/programs/blockchain-development-program-t175/).
- Adam Lemmon from [convergence.Tech](https://convergence.tech/)
