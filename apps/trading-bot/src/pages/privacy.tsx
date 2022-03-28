import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import React from 'react';

import { MainLayout } from '@/components/layout/main-layout';

const PrivacyPolicy = () => {
  return (
    <MainLayout>
      <Container
        style={{
          textAlign: 'justify',
          marginTop: '32px',
          marginBottom: '32px',
        }}>
        <Box marginBottom={5}>
          <Typography variant="h3" style={{ fontWeight: 'bold' }}>
            NextTradingBot Privacy Policy
          </Typography>
        </Box>
        <Box marginTop={5}>
          <Typography variant="body1">
            NextTradingBot understands you care about how your personal
            information is used and shared, and we take your privacy seriously.
            Please read the following to learn more about our privacy practices.
            By using or accessing the Services in any manner, you acknowledge
            that you accept the practices and policies outlined in this Privacy
            Policy, and you hereby consent that we will collect, use, and share
            your information in the following ways. Remember that your use
            of NextTradingBot's Services is subject to the
            <Link href={`/terms-of-service`}>Terms of Use</Link>, which
            incorporates this Privacy Policy. Any terms we use in this Policy
            without defining them have the definitions given to them in the
            <Link href={`/terms-of-service`}>Terms of Use</Link>
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            What does this Privacy Policy cover?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            This Privacy Policy applies to NextTradingBot.com, and all other
            websites, applications, products, services, and other offerings
            (collectively, the “Services”) owned and operated by NextTradingBot.
            This Policy covers our treatment of the personal information we
            gather through use of our Services.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            What Information does NextTradingBot Collect?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We collect information about your use of our Services, including
            purchase history and items that you show interest in. We also gather
            various types of personal information, as explained in more detail
            below. We use this information internally in connection with our
            Services, including to: personalize, provide, and improve our
            Services; allow you to set up a user account and profile; contact
            you and allow other users to contact you; enable fulfillment of
            requests for certain products and services; and analyze how you use
            the Services. In certain cases, we may also share some personal
            information with third parties, but only as described below.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Information You Provide to Us:
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We receive and store any information you knowingly provide to us.
            For example, if you create an account or place an order with us, we
            may collect personal information such as:
          </Typography>
        </Box>

        <Box marginTop={3}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Communication with Us
          </Typography>
        </Box>
        <Box marginTop={1}>
          <Typography variant="body1">
            We collect personal information from you when you communicate with
            us, for example when you request information about our services,
            contact our Support team, apply for a job, or register for our
            newsletter.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Surveys, Sweepstakes, and Contests
          </Typography>
        </Box>
        <Box marginTop={1}>
          <Typography variant="body1">
            We may ask you to participate in optional surveys, where you may be
            asked to provide personal information. <br />
            <br />
            Additionally, we may conduct sweepstakes or contests where you may
            be asked to provide personal information. This information may be
            used to contact you about the sweepstakes or contest, and for other
            promotional and marketing purposes, as permitted by law.
            Additionally, note that some jurisdictions require us to publicly
            share information about sweepstakes and contest winners.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Forums and Social Media
          </Typography>
        </Box>
        <Box marginTop={1}>
          <Typography variant="body1">
            Our Services may provide forums, blogs, social media pages, or other
            channels where individuals may review purchases, talk about their
            experience using our Services, or “like” or “share” content to
            social media. Content provided in these channels is public and not
            subject to the privacy protections laid out in this Privacy Policy.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Information Collected Automatically
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            Whenever you interact with our Services, we automatically receive
            and record information on our server logs from your browser or
            device, device identification, the type of browser and/or device
            you’re using to access our Services, and the page or feature you
            requested.
            <br />
            <br />
            Additionally, we, as well as third parties that provide content,
            advertising, or other functionality on our Services, may use
            cookies, pixel tags, local storage, and other technologies to
            collect information automatically through our Services.
            <br />
            <br />
            These technologies are small data files that we transfer to your
            browser or device that allows us to provide and enhance our
            Services. You may be able to change the preferences on your browser
            or device to prevent or limit your device’s acceptance of these
            technologies, but this may prevent you from taking advantage of some
            of our features.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Analytics
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We may use analytics service providers, including Google Analytics,
            to collect information regarding visitors to our Services, such as
            their behavior on our Services or information about their
            demographic. For more information about Google Analytics, see
            <Link
              href={{
                pathname: 'https://www.google.com/policies/privacy/partners/',
              }}>
              https://www.google.com/policies/privacy/partners
            </Link>
            <br /> <br />
            To opt out of Google Analytics, visit
            <Link
              href={{
                pathname: 'https://tools.google.com/dlpage/gaoptout',
              }}>
              https://tools.google.com/dlpage/gaoptout
            </Link>
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Do-Not-Track
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            Your browser may offer you a “Do Not Track” option, which allows you
            to signal to operators of websites and web applications and services
            (including behavioral advertising services) that you do not wish
            such operators to track certain of your online activities over time
            and across different websites. At this time, we do not respond to
            nor honor Do-Not-Track signals from web browsers.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            Information Collected from Third Parties
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We may collect information about you through a referral program. If
            you have been referred to NextTradingBot but wish to opt out of
            emails from us, please contact us as explained below.
            <br />
            <br />
            If you access our Services through a third party or social
            networking site, we may collect information about you from that
            third-party application if that information has been made public via
            your privacy settings with that third party. For example, if you
            register for NextTradingBot with Facebook, we may collect your name,
            profile ID, location, gender, profile picture, and list of your
            friends. <br />
            <br />
            We may receive information about you from other sources, including
            to supplement the information we have collected about you.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5" style={{ fontWeight: 'bold' }}>
            How Does NextTradingBot Use the Personal Information It Collects?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We use the information we collect about you for various business
            purposes as described below.
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Provide, Personalize, and Improve our Services
          </Typography>
        </Box>
        <Box marginTop={1}>
          <ul>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Allow you to set up a user account and profile
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Fulfill your requests for products and services
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Provide customized content, offers, or Services, including
                marketing content via email, social media, SMS, or other
                channels
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Communicate with you about your account and updates to our
                Services
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">Process payments</Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Provide advertising, analytics, and marketing
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Process applications and transactions
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Allow you to register for events
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Facilitate communications between you and other users
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Analyze how you use the Services
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Understand interest and engagement on the Services
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Engage in marketing or sales outreach
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Research and develop Services
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Improve and streamline our Services
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Other purposes you consent to or are notified of at the time you
                provide personal information
              </Typography>
            </li>
          </ul>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            Protect You and Our Services and Comply with the Law
          </Typography>
        </Box>
        <Box marginTop={3}>
          <ul>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Detect security incidents; protect against malicious, deceptive,
                fraudulent, or illegal activity
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">Ensure quality control</Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Verify your identity and prevent fraud
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Debug to identify and repair errors
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Enforce our Terms and policies
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Audit or other compliance activities
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Comply with our legal obligations, protect your vital interest,
                or as may be required for the public good
              </Typography>
            </li>
          </ul>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            De-Identified and Aggregated Information
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We may use personal information to create de-identified, aggregated
            information such as: information about demographics, de-identified
            location information, information about devices used to access our
            Services, and de-identified, aggregate information on transactions
            on our Services that help our users understand and optimize sales.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            Automatic Collection Technologies
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            Our use of automatic collection technologies such as cookies, pixel
            tags, and local storage objects fall into the following general
            categories:
          </Typography>
        </Box>
        <Box marginTop={3}>
          <ul>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Strictly Necessary: Technologies that allow you to access our
                Services and use our features, and tools that help us identify
                irregular site behavior and prevent fraudulent activity or
                improve security.
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Personalization: Technologies that help us personalize
                advertising and content for you, such as by making inferences
                about your interests based on the content you interact with on
                our Services, which informs future selections of content or
                advertising.
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Measurement: Technologies that collect information about your
                use of our Services, including measuring, understanding, and
                reporting on your usage of the Services.
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Information Storage and Access: Technologies that store
                information or provide access to information that is already
                stored on your device, such as your shopping cart.
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Content Selection, Delivery, and Reporting: Technologies that
                select and deliver content for you, and measure the
                effectiveness of that content, including information about what
                content was shown, how often or how long it was shown, when and
                where it was shown, and what actions, if any, you took on the
                content.
              </Typography>
            </li>
            <li style={{ padding: '12px' }}>
              <Typography variant="body1">
                Ad Selection, Delivery, and Reporting: Technologies that select
                and deliver advertisements for you, and measure the
                effectiveness of those advertisements, including information
                about what advertisements were shown, how often or how long they
                were shown, when and where they were shown, and what actions, if
                any, you took on the advertisements.
              </Typography>
            </li>
          </ul>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">Third-Party Websites</Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We may offer links to third-party websites or Services, which are
            not controlled by us and not subject to the protections laid out in
            this Privacy Policy. We do not endorse nor approve any third-party
            website and we encourage our users to read the Privacy Policy of
            each service they interact with.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">Cross-Device Tracking</Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            Your browsing activity may be tracked across different devices
            or NextTradingBot Services. For instance, we may match your activity
            on our website using your mobile device with your browsing activity
            on your laptop. To do this, we may match information such as your
            browsing patterns, geolocation, and device identifiers where it
            appears to be related to the same user.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">APIs and SDKs</Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We may use third-party APIs and software development kits (“SDKs”),
            which may allow third parties to collect personal information about
            you for various purposes, such as to conduct analytics, verify your
            business when you register with NextTradingBot.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            Will NextTradingBot Share Any of the Personal Information It
            Receives
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We do not rent nor sell your personal information in personally
            identifiable form to anyone.
            <br /> <br />
            We may share your personal information with third parties as
            described in this section:
            <br /> <br />
            When You Request That We Share Your Information: We may offer
            Services, features, or promotions that involve sharing your
            information with a third party or with other NextTradingBot users.
            If you request or agree to have your information shared with a third
            party as part of a feature or Service, we will share that
            information at your request.
            <br /> <br />
            De-Identified Information: We may provide de-identified or aggregate
            information to our partners, including usage information to help our
            partners understand how often and in what ways people use our
            Services, so that they, too, can provide you with an optimal online
            experience. Before we share this information, we take reasonable
            efforts aligned with industry best practices to ensure that this
            information cannot identify you.
            <br /> <br />
            Advertising: We allow advertisers and/or merchant partners
            (“Advertisers”) to choose the demographic information of users who
            will see their advertisements and/or promotional offers. You agree
            that we may provide any of the information we have collected from
            you in non-personally identifiable form to an Advertiser, in order
            for that Advertiser to select the appropriate audience for those
            advertisements and/or offers. For example, we might use the fact you
            are located in San Francisco to show you ads or offers for San
            Francisco businesses, but we will not tell such businesses who you
            are. Or, we might allow Advertisers to display their ads to users
            with similar usage patterns to yours, but we will not disclose usage
            information to Advertisers except in aggregate form, and not in a
            manner that would identify you personally. Note that if an
            advertiser asks us to show an ad to a certain audience or audience
            segment and you respond to that ad, the advertiser may conclude that
            you fit the description of the audience they were trying to reach.
            <br /> <br />
            Affiliates: We may share your information with our affiliated
            companies. Service Providers: We employ service providers to perform
            tasks on our behalf, and we need to share your information with them
            in order to provide products or services to you; for example, we may
            use a payment processing company to receive and process any credit
            card transactions for us. Unless we tell you differently (or unless
            stated otherwise in a third-party Privacy Policy referred to below),
            our service providers do not have any right to use the personal
            information we share with them beyond what is necessary to assist
            us. We currently use the following third-party services, and by
            using our Services, you agree to be bound by the applicable privacy
            policies for such third-party services:
          </Typography>
          <ul>
            <li>
              <Link href="https://stripe.com/us/privacy">
                Stripe, Inc.;https://stripe.com/us/privacy
              </Link>
            </li>
          </ul>
          <Typography variant="body1">
            User Profiles and Submissions: Certain user profile information,
            including your name, location, and any video or image content that
            such user has uploaded to the Services, may be displayed to other
            users to facilitate user interaction within the Services or address
            your request for our services. Your account privacy settings may
            allow you to limit the other users who can see the personal
            information in your user profile and/or what information in your
            user profile is visible to others. Please remember that any content
            you upload to your public user profile, along with any personal
            information or content that you voluntarily disclose online in a
            manner other users can view (on discussion boards, in messages and
            chat areas, etc.) becomes publicly available, and can be collected
            and used by anyone. Your user name may also be displayed to other
            users if you send messages or comments or upload images or videos
            through the Services and other users can contact you through
            messages and comments.
            <br /> <br />
            Business Transfers: We may choose to buy or sell assets, and may
            share and/or transfer customer information in connection with the
            evaluation of and entry into such transactions. Also, if we (or our
            assets) are acquired, or if we go out of business, enter bankruptcy,
            or go through some other change of control, personal information
            could be one of the assets transferred to or acquired by a third
            party.
            <br /> <br />
            Protection of Company and Others: We reserve the right to access,
            read, preserve, and disclose any information that we reasonably
            believe is necessary to comply with law or court order; enforce or
            apply our <Link href={`/terms-of-service`}>Terms of Use</Link>
            and other agreements; or protect the rights, property, or safety of
            Company, our employees, our users, or others.
            <br /> <br />
            International Data Transfers: You agree that all information
            processed by us may be transferred, processed and stored anywhere in
            the world, including but not limited to the United States or other
            countries which may have data protection laws that are different
            from the laws where you reside or do business. We have taken
            reasonable safeguards to require that your personal information will
            remain protected, and we require our third-party service providers
            to provide appropriate safeguards as well.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">Children’s Information</Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            As noted in the
            <Link href={`/terms-of-service`}>Terms of Use</Link>, we do not
            knowingly collect nor solicit personal information from anyone under
            the age of 18. If you are under 18, please do not attempt to
            register for the Services or send any personal information about
            yourself to us. If we learn that we have collected personal
            information from a child under age 18, we will delete that
            information as quickly as possible. If you believe that a child
            under 18 may have provided us with personal information, please
            contact us as described below.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            Is Personal Information About Me Secure?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            You must prevent unauthorized access to your account and personal
            information by selecting and protecting your password appropriately
            and limiting access to your computer or device and browser by
            signing off after you have finished accessing your account. We
            endeavor to protect the privacy of your account and other personal
            information we hold in our records, but unfortunately, we cannot
            guarantee complete security. Unauthorized entry or use, hardware or
            software failure, and other factors, may compromise the security of
            user information at any time.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            What Are My Privacy Rights and Choices?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            You can always opt not to disclose information to us, but keep in
            mind some information may be needed to register with us or to take
            advantage of some of our features.
            <br /> <br />
            Opting Out of Communications: If you no longer wish to receive
            communications from us, click the unsubscribe link at the bottom of
            the email or follow opt-out instructions provided in other
            communication channels. Note you may still receive transactional
            emails from us.
            <br />
            <br />
            Opting Out of Cookies and Advertising: You may stop or restrict the
            placement of cookies on your device or remove them as your browser
            or device permits. Visit
            <Link
              href={{
                pathname:
                  'https://www.networkadvertising.org/managing/opt_out.asp',
              }}>
              www.networkadvertising.org/managing/opt_out.asp
            </Link>
            ,
            <Link
              href={{
                pathname: 'https://www.youronlinechoices.eu',
              }}>
              www.youronlinechoices.eu
            </Link>
            ,
            <Link
              href={{
                pathname: 'https://www.youradchoices.ca/choices',
              }}>
              www.youradchoices.ca/choices
            </Link>
            , and
            <Link
              href={{
                pathname: 'https://www.aboutads.info/choices/',
              }}>
              www.aboutads.info/choices/
            </Link>
            to learn more about the choices available to opt out of cookies and
            advertising.
            <br />
            <br />
            Updating Your Account Information: Through your account settings,
            you may access, and, in some cases, edit or delete the following
            information you’ve provided to us:
          </Typography>
          <ul>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">Email address</Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">Personal information</Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">Business information</Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">Contact Information</Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">Shipping information</Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">Addresses</Typography>
            </li>
          </ul>
          <Typography variant="body1">
            The information you can view, update, and delete may change as the
            Services change. If you have any questions about viewing or
            updating information we have on file about you, please contact us as
            described below.
            <br /> <br />
            You may also have privacy rights including:
          </Typography>
          <ul>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">
                Access Data: You may have the right to receive a copy of data we
                have about you.
              </Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">
                Request Correction of Data: You may request that we update
                information we have about you.
              </Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">
                Request Deletion of Data: You may request that we delete
                information we have about you.
              </Typography>
            </li>
            <li style={{ paddingTop: '12px' }}>
              <Typography variant="body1">
                Request Restriction of or Object to Processing: You may have the
                right to opt in or opt out of certain uses of your data.
              </Typography>
            </li>
          </ul>
          <Typography variant="body1">
            If you would like to exercise any of these rights, please contact us
            as described below. We will process your request in the time and
            manner required by law. To protect your privacy, we may take steps
            to verify your identity before fulfilling your request.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">Data Retention</Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We store personal information for as long as you use our Services or
            as may be necessary to fulfill the purposes for which the
            information was collected, provide our Services, resolve disputes or
            establish legal defenses, enforce our Terms or other agreements,
            engage in audits, protect our Services, prevent fraud, comply with
            the law, or for legitimate business purposes.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">Security</Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We take steps to treat your information securely and make sure it is
            treated in accordance with this Privacy Policy. No system is 100%
            secure, and we cannot ensure nor warrant the security of any
            information you provide us.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            Will NextTradingBot Change this Privacy Policy?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            We’re constantly trying to improve our Services, so we may need to
            change this Privacy Policy from time to time as well, but we will
            alert you to material changes by placing a notice on
            the https://www.nexttradingbot.com website, by sending you an email,
            and/or by some other means.
            <br /> <br />
            By using the Services after any changes to the Privacy Policy have
            been posted, you agree to the new Privacy Policy.
          </Typography>
        </Box>
        <Box marginTop={4}>
          <Typography variant="h5">
            What if I have questions about this policy?
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="body1">
            If you have any questions or concerns regarding our privacy
            policies, please contact us at:
          </Typography>
        </Box>
        <Box marginTop={3}>
          <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
            Next Trading Bot <br />
          </Typography>
          <Typography variant="body1" style={{ paddingTop: '8px' }}>
            Thang Long Tower
            <br />
            Thang Long, <br />
            Ha Noi
            <br /> <br />
            support@nexttradingbot.com
          </Typography>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default PrivacyPolicy;
