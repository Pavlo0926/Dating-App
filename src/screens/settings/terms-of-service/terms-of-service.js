import React from "react";
import { Linking, SafeAreaView, ScrollView, View } from "react-native";
import { Screen, Text } from "@components";

import Header from "../header";
import styles from "./terms-of-service.style";

const privacyCategories = [
  {number: 1, category: "Identifiers", example: "Name, email address, IP address, online identifier, email address, device identifiers, username, or other similar data"},
  {number: 2, category: "Internet or electronic network activity information ", example: "Information regarding a consumer’s interaction with an Internet website, application, or advertisement, in-app activity"},
  {number: 3, category: "Geolocation ", example: "General location (e.g. city, state and country)"},
  {number: 4, category: "Inferences drawn from any information described herein to create a profile about a consumer", example: "Profile reflects consumer reflecting the consumer’s preferences, characteristics, psychological trends, preferences, predispositions, behavior, attitudes, intelligence, abilities, and aptitudes. "},
];

const TermsOfService: () => React$Node = props => {
  let isPrivacy = props.navigation.state.params.content !== undefined;

  const renderEmail = (email) => {
    return (
      <Text
        style={styles.linkText}
        onPress={() => Linking.openURL(`mailto:${email}`)}>
        {email}
      </Text>
    )
  }

  const renderLink = (url) => {
    return (
      <Text
        style={styles.linkText}
        onPress={() => Linking.openURL(url)}>
        {url}
      </Text>
    )
  }

  const renderGroup = (listMark, content) => {
    return (
      <View style={styles.flexRow}>
        <Text style={[styles.contentText, styles.listMark]}>{listMark}</Text>
        <Text style={[styles.flexFill, styles.contentText]}>{content}</Text>
      </View>
    )
  }

  const renderPrivacyRow = (category) => {
    return (
      <View style={styles.flexTableRow} key={`category-${category.number}`}>
        <View style={styles.tableRowOne}>
          <Text style={styles.tableContentText}>{category.number}</Text>
        </View>
        <View style={styles.tableRowTwo}>
          <Text style={styles.tableContentText}>{category.category}</Text>
        </View>
        <View style={styles.tableRowThree}>
          <Text style={styles.tableContentText}>{category.example}</Text>
        </View>
      </View>
    )
  }

  const renderPrivacy = () => {
    return (
      <View>
        <Text style={[styles.contentText]}>
          This privacy policy will explain what information we collect online, why we collect it, and the choices we offer to you.
          This privacy policy (“Policy”) describes the data practices of Pluzo LLC (“<Text style={styles.boldText}>Company</Text>”), covering its services under its control, including the mobile application known as Pluzo any and all the Company website, and any other website or mobile application (collectively "Services"). By using the Services, you are consenting to this Policy and the processing of your data in the manner provided in this Policy. If you do not agree with these terms, please do not use the Services. This Privacy Policy was last updated on <Text style={styles.boldText}>October 23, 2020.</Text>
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Information we collect{"\n"}
        </Text>
        <Text style={styles.contentText}>
          We may collect information about the Services you use and how you use them, such as   data regarding your usage of the App and activity in the App. We collect PII, DII, and log information about your interactions as described below.
          {"\n\n"}Personally identifiable information (PII) is information that can be used to identify or contact you online or offline, such as your name, address, email, phone number, photos or audio data, and payment information, or data that is linked to such identifiers. The Services may collect PII when it is provided to us, such as when you use our Services, attempt to contact us, submit a resume or job application, or connect with us on social media or one of our partners. 
          {"\n\n"}We may also create or collect device-identifiable information (DII), such as cookies, unique device and advertising identifiers, statistical identifiers, usernames, and similar identifiers that are linkable to a browser or device. From these platforms, we may also receive other information, such as your IP address, user agent, timestamps, precise and imprecise geolocation, sensor data, apps, fonts, battery life information, and screen size.
          {"\n\n"}Our Services also collect information about your interactions, including navigation paths, search queries, crashes, timestamps, purchases, clicks and shares, and referral URLs. We may combine this data with PII and DII. For efficiency’s sake, information about your interactions may be transmitted to our servers while you are not using the Services. We may also partner with third-parties that collect additional information – please see their privacy policies for more details and see below for your choices regarding these parties.
          {"\n\n"}<Text style={styles.boldText}>Categories of PII We Collect:</Text> We have collected the following information from consumers within the past 12 months. 
        </Text>
        <View style={[styles.flexTableRow, styles.tableTop]}>
          <View style={styles.tableRowOne}>
            <Text style={styles.tableNameText}>Category Number</Text>
          </View>
          <View style={styles.tableRowTwo}>
            <Text style={styles.tableNameText}>Category</Text>
          </View>
          <View style={styles.tableRowThree}>
            <Text style={styles.tableNameText}>Examples</Text>
          </View>
        </View>
        {
          privacyCategories.map((category) => {
            return renderPrivacyRow(category);
          })
        }
        <View style={styles.tableBottom}/>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}How we use information we collect{"\n"}
        </Text>
        <Text style={styles.contentText}>
          We use the information we collect from our Services to provide, maintain, protect and improve our Services, to develop new Services and offerings, and to protect us and our users.
          {"\n"}
        </Text>
        {renderGroup("A.", "To meet the reason for which the PII was provided.")}
        {renderGroup("B.", "To provide you with information or services you request from us.")}
        {renderGroup("C.", "To improve our website and performance of the contents therein.")}
        {renderGroup("D.", "To resolve disputes.")}
        {renderGroup("E.", "Preventing potentially fraudulent, prohibited, or illegal activities.")}
        {renderGroup("F.", "Enforcing the Terms of Service.")}
        {renderGroup("G.", "Performing other duties as required by law.")}
        <Text style={styles.contentText}>
          {"\n"}We share PII and DII with companies, outside organizations, and individuals for limited reasons and the following business purposes, outlined below:
          {"\n"}
        </Text>
        {renderGroup("A.", "We will share PII and other data with companies, outside organizations or individuals if we have your consent to do so.\n")}
        {renderGroup("B.", "For external processing - We provide PII to our affiliates or other trusted businesses or persons to process it for us, based on our instructions and in compliance with our Privacy Policy and any other appropriate confidentiality and security measures.\n")}
        {renderGroup("C.", "For legal reasons - We will share PII with companies, outside organizations or individuals if we have a good-faith belief that access, use, preservation or disclosure of the information is reasonably necessary to meet any applicable law, regulation, legal process or enforceable governmental request, detect, prevent, or otherwise address fraud, security or technical issues or protect against harm to the rights, property or safety of our users or the public as required or permitted by law.\n")}
        {renderGroup("D.", "In case of a sale or asset transfer - If we become involved in a merger, acquisition or other transaction involving the sale of some or all of our assets, user information, including PII collected from you through your use of our Services, could be included in the transferred assets. Should such an event occur, we will use reasonable means to notify you, either through email and/or a prominent notice on the Services.\n")}
        {renderGroup("E.", "We may share aggregated information and DII with our partners such as businesses we have a relationship with, advertisers or connected sites. For example, we may share information to show trends about the general use of our services.\n")}
        {renderGroup("F.", "With third-party analytics and ad-tech companies for the purpose of providing analytics to improve our Services and providing and delivering targeted advertising.\n")}
        <Text style={styles.contentText}>
          We disclose your PII for business purposes to the following categories of third-parties: 
          {"\n"}
        </Text>
        {renderGroup("A.", "Our affiliates")}
        {renderGroup("B.", "Services providers")}
        {renderGroup("C.", "APIs")}
        {renderGroup("D.", "Third-parties")}
        <Text style={styles.contentText}>
          {"\n"}We use DII to operate our Services and manage user sessions, including analyzing usage of our Services, preventing malicious behavioral and fraud, improving the content, to link your identity across devices and browsers in order to provide you with a more seamless experience online, and helping third-parties provide relevant advertising and related metrics. We share DII with third-parties primarily for advertising and analytics purposes, for external processing, and for security purposes.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Third-Parties{"\n"}
        </Text>
        <Text style={styles.contentText}>
          While we strive to work with reputable companies with good privacy practices, this Policy does not apply to services offered by other companies or individuals, including products or sites that may be displayed to you on the Services. We also do not control the privacy policies and your privacy settings on third-party sites, including social networks. We may use third-parties to help offer you more tailored ads and better Services, such as obtaining analytics about the users of our site and to help tailor advertising to your preferences. For further information, please see the relevant privacy policies for each third-party and industry codes of conduct including, {renderLink("https://unity3d.com/legal/privacy-policy")}. 
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Choice{"\n"}
        </Text>
        <Text style={styles.contentText}>
          Like many other companies, we do not honor DNT flags but instead offer other choices with respect to third-parties. Many third-parties participate in self-regulation to offer you a choice regarding receiving targeted ads. Please note that you’ll still see generic ads after opting out, but they won’t be based on your activities online. On the web, you can opt out of participating companies by visiting the following sites:
          {"\n"}
        </Text>
        {renderGroup("•", renderLink("http://optout.networkadvertising.org/"))}
        {renderGroup("•", renderLink("http://optout.aboutads.info/"))}
        {renderGroup("•", renderLink("http://youronlinechoices.eu/"))}
        {renderGroup("•", renderLink("https://tools.google.com/dlpage/gaoptout"))}
        {renderGroup("•", renderLink("https://support.apple.com/en-us/HT202074"))}
        {renderGroup("•", "If you see a Unity ad, you can opt-out then or at any time by clicking or tapping the “i” button (or Data Privacy icon) on any ad you see (the “i” button or Data Privacy icon will also allow you to access the data that is collected about you in that particular app)")}
        <Text style={styles.contentText}>
          {"\n"}If you wish to similarly opt out of cross-app advertising on mobile devices, you can enable the Limit Ad Tracking flag on the device. Enabling Limit Ad Tracking sends a flag to third-parties that you wish to opt out of targeted advertising on that device, and major mobile platforms require companies to honor this flag. Screenshots on how to find these options on various devices are available here: {renderLink("http://www.networkadvertising.org/mobile-choices")}. To learn how to opt out on other devices, please visit the platform’s privacy policies for more information.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Information security{"\n"}
        </Text>
        <Text style={styles.contentText}>
          We work hard to protect our users from unauthorized access to or unauthorized alteration, disclosure or destruction of information we hold and undertake reasonable security measures with appropriate confidentiality, integrity, and availability protections. However, since no software or storage system is 100% secure, we cannot guarantee for the security of your information associated with the Services, or any other service for that matter. You can help protect your account information by using unique and hard-to-guess passwords. We retain data for the maximum amount of time allowable under applicable law. 
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Children Under 13{"\n"}
        </Text>
        <Text style={styles.contentText}>
          We do not knowingly collect information for any child under the age of 13. If you are the parent of a child under the age of 13 and have a concern regarding your child’s information on our Services, please contact us at the email provided at the end of this Policy.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Changes{"\n"}
        </Text>
        <Text style={styles.contentText}>
          Our Privacy Policy may change from time to time. We will post any Policy changes on this page and within the settings of any mobile apps. Please check back periodically to view changes to our privacy policy. 
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}Questions?{"\n"}
        </Text>
        <Text style={styles.contentText}>
          If you have questions or requests regarding our privacy practices, please contact us at {renderEmail("contact@pluzo.com")}.
        </Text>
      </View>
    )
  }

  const renderTos = () => {
    return (
      <View>
        <Text style={[styles.contentText, styles.boldText]}>
        Welcome to Pluzo. Please read these Terms of Service and our Privacy Policy carefully before using the  Services.
        </Text>
        <Text style={styles.contentText}>
        {"\n"}By using our Services, as defined herein, whether as a guest, as a registered user, or otherwise, you agree that these Terms of Service will govern your relationship with Pluzo LLC. If you do not completely agree to these Terms of Service then you must not use any of our Services.{"\n"}
        Your use of the Services is conditioned upon your agreement to the Privacy Policy. Please review the complete Privacy Policy, which is incorporated herein by reference. If you do not agree to the terms and conditions set forth in the Privacy Policy, you may not use the Services. By using the Services, you confirm that you are above the minimum age and are not barred from using the Services under applicable law. The Services are not directed to children under 13 and you may not use the Services if you are under 13 years old.
        </Text>
        
        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}1. Definations{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          <Text style={styles.boldText}>“Dispute”</Text> means, any controversy related to these Terms, including without limitation claims arising out of or relating to any aspect of the relationship between you and Company, claims that arose before these Terms and claims that may arise after the termination of these Terms; however, this does not include claims related to or arising from the enforcement or protection of Intellectual Property Rights, and is subject to any applicable statutory consumer rights laws in your local jurisdiction.
          {"\n\n"}<Text style={styles.boldText}>“Company”</Text> means, Pluzo LLC. References to “Us,” “We,” or “Our” means Pluzo LLC, including any and all subsidiaries parent companies, joint ventures, and other corporate entities under common ownership and/or any of their agents, consultants, employees, officers, and directors.  Company does not include Company Affiliates or third-parties. 
          {"\n\n"}<Text style={styles.boldText}>“Company Affiliate” (or “Company Affiliates”)</Text> means, Company’s third-party content providers, distributors, licensees, or licensors. 
          {"\n\n"}<Text style={styles.boldText}>“App”</Text> means the mobile application  known as Pluzo, which is available for certain mobile devices on the iOS App Store and the Google Play Store. 
          {"\n\n"}<Text style={styles.boldText}>“Intellectual Property Rights”</Text> means, any and all right, title, and interest of every kind whatsoever, whether now known or unknown, registrable or otherwise, in and to patents, trade secret rights, copyrights, trademarks, service marks, trade dress and similar rights of any type under the laws of any governmental authority, including, without limitation, all applications and registrations relating to the foregoing.
          {"\n\n"}<Text style={styles.boldText}>“License”</Text> means the limited License company grants you to the Services, as set forth in Section 2(b) herein. 
          {"\n\n"}<Text style={styles.boldText}>“Notice”</Text> means, a delivered writing by e-mail or courier delivery to the other party at their respective address and will be effective upon receipt.  
          {"\n\n"}<Text style={styles.boldText}>“Privacy Policy”</Text> means, Company’s policy regarding privacy, which also governs your use of the Services and is incorporated herein by reference. The current version is available on our website via the .
          {"\n\n"}<Text style={styles.boldText}>“Service” (or “Services”)</Text> means, any website or mobile application provided by Company including without limitation the App and the Company website {renderLink("https://www.pluzo.com/")}.
          {"\n\n"}<Text style={styles.boldText}>“Terms of Service” (or “Terms”)</Text> means, the terms and conditions in this agreement.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}2. Ownership and Limited License{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  <Text style={styles.boldText}>Ownership.</Text> The Services are owned or licensed by Company and are protected by Intellectual Property Rights and other proprietary rights laws. Company reserves all right, title, and interest in and to the Services, including without limitation all Intellectual Property Rights and other proprietary rights, that are not explicitly granted to you in these Terms. Your permitted use of the Services is limited by the license granted herein. 
          {"\n\n"}b)  <Text style={styles.boldText}>License.</Text> Subject to your agreement and continuing compliance with these Terms and any other relevant Company policies, Company grants you a non-commercial, non-exclusive, non-transferable, fully revocable, limited license, subject to the limitations in these Terms, to access and use the Services for your own entertainment and informational purposes. You agree that you will not use the Services for any other purpose. 
          {"\n\n"}c)  <Text style={styles.boldText}>License Limitations.</Text> Any use of the Services in violation of the law, these Terms, or these License limitations is strictly prohibited, and may result in the immediate revocation of your limited License at Company’s sole judgment or may subject you to liability for violations of law. 

          {"\n\n"}You acknowledge you will not directly or indirectly:{"\n\n"}
          <Text style={[styles.contentText, styles.paddingLeft]}>
          i)  Partake in any activity or action that Company deems to be against the spirit or intent of the Services;
          {"\n\n"}ii)  Copy, modify, edit, create derivative works of, publicly display, publicly perform, republish, transmit, or distribute the Services or any other material obtained through the Services;
          {"\n\n"}iii)  Lease, sell, rent, or otherwise exploit for commercial purposes any part of the Services, including without limitation access to or use of the Services;
          {"\n\n"}iv)  Delete, alter, or obscure any Intellectual Property Rights or other proprietary rights notices from copies of materials from the Services;
          {"\n\n"}v)  Attempt to harass, threaten, bully, embarrass, abuse, or harm, or advocate or incite harassment, abuse, or harm of another person, group, Company itself or Company Affiliates;
          {"\n\n"}vi)  Organize or participate, in conjunction with your use of the Services, in any activity or group that is hateful, harmful, or offensive towards a race, sexual orientation or preferences, religion, heritage or nationality, disability or other health class, gender, age, or similar classes determined by Company; 
          {"\n\n"}vii)  Initiate, assist, or become involved in any form of attack or disruption to the Services, including without limitation distribution of a virus, worm, spyware, time bombs, corrupted data, denial of service attacks upon the Services, or other attempts to disrupt the Services or other person’s use or enjoyment of the Services;
          {"\n\n"}viii)  Use robots, spiders, crawlers, man-in-the-middle software, or any other automated process to access, use, reverse engineer, or manipulate the Services, or Company;
          {"\n\n"}ix)  Use of access services to obtain, generate, or infer any business information about Company or Company Affiliates, including without limitation information about sales or revenue, staff, technical stack, or statistics about users;
          {"\n\n"}x)  Promote, encourage, or participate in any activity involving hacking, phishing, distribution of counterfeit Services, or taking advantage of or creating exploits, cheats, bugs, or errors, except for the sole purpose of privately and directly notifying Company;
          {"\n\n"}xi)  Make available through the Services any material or information that infringes any intellectual property right, right of privacy, right of publicity, or other right of any person or entity or impersonates any other person, including without limitation celebrities and Company employees;
          {"\n\n"}xii)  Attempt to gain unauthorized access to Services; and
          {"\n\n"}xiii)  Use the Services where it is prohibited by law.
          </Text>

          {"\n\n"}d)  <Text style={styles.boldText}>App License.</Text> These Terms and the License entitle you to install and use one copy of the App on a mobile device. In addition, you may make one archival copy of the App. The archival copy must be on a storage medium other than a hard drive, and may only be used for reinstallation of the App. You may not use, copy, or install the App on any system with more than one computer, or permit the use, copying, or installation of the App by more than one user or on more than one computer. If you hold multiple, validly licensed copies of the App, you may not use, copy, or install the App on any system with more than the number of computers permitted by these Terms, or permit the use, copying, or installation by more users, or on more computers than the number permitted by the License.
          {"\n\n"}e)  <Text style={styles.boldText}>App Versions.</Text> You acknowledge and agree that there is a “free” and a “Plus” version of the App. The Plus version allows you to access the App without ads, super like a profile, boost your account, rewind (i.e. undo) swipes, and have unlimited right swipes. If you wish to return or otherwise receive a refund related to your purchase of the Plus version of the App, you acknowledge and agree that you must do so through the iOS App Store or the Google Play Store, as applicable. 
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}3. Term{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  Unless modified or amended by Company, these Terms of Service shall remain in full force and effect. Termination of the License or any other license granted by Company under these Terms does not affect any other provisions of these Terms nor will termination waive or diminish any Company rights hereunder. 
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}4. Access and Permissible Assignment{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  By using the Services, you warrant and represent that you: 1) are at least 18 years of age and otherwise legally competent to read, understand and accept the provisions of this agreement; or 2) are a minor who has been authorized under the provisions of Section 4(b) below. 
          {"\n\n"}b)  If you are the legal guardian of a minor, you can choose to allow use of the Services by that minor instead of yourself subject to the following provisions:
          {"\n\n"}i)  You acknowledge, and further agree that the aforementioned minor is entering into an agreement with your consent;
          {"\n\n"}ii)  You acknowledge, and further agree you are entirely responsible for all the provisions in these Terms of Service;
          {"\n\n"}iii)  You acknowledge, and further agree, you are legally responsible for all actions of that minor, including but not limited to any payments, damages and/or liabilities related to the actions of that minor;
          {"\n\n"}iv)  In consideration of Company allowing access to the Service by a minor, and in addition to the provisions of Section 8 below, the foregoing legal guardian hereby guarantees and agrees to pay for any and all liabilities of any nature whatsoever incurred under this agreement and to defend, indemnify and hold harmless Company with respect thereto.
          {"\n\n"}c)  If you have been previously banned from using any Company services then you may not use the Services.
          {"\n\n"}d)  Notwithstanding the above provisions of Section 4, if you are located in a country that requires parental consent for Services to collect or use your data at a higher age than 13 (e.g., certain countries following the General Data Protection Regulation) AND you are under that country’s specified age, you must not use any part of the Services or submit any personal information to Company through the Services or otherwise unless a) consent was given or authorized by the holder of parental responsibility of that child and b) you receive a Notice that consent was confirmed from Company.
          {"\n\n"}e)  Use and access of the Services may require the use of your personal computer, laptop, tablet, or mobile device, as well as communication with or use of space on such device. You are solely responsible for all internet and/or mobile data connection and all associated fees that you incur when accessing the Services.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}5. Service Availability and Termination{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  You acknowledge that:
          {"\n\n"}i)  Company may in its sole and absolute discretion provide subsequent amendments, versions, enhancements, modifications, upgrades or patches related to any part of the Services;
          {"\n\n"}ii)  Company has absolute and sole discretion to immediately terminate or restrict access to the Services, or any portion of the Services at any time, for any reason or for no reason, without Notice and without liability to you;
          {"\n\n"}iii)  Access to the Services may be interrupted for reasons within or beyond the control of Company, and that Company cannot and does not guarantee you will be able to use the Services whenever you wish to do so;
          {"\n\n"}iv)  Company may not offer the Services in all countries or geographic locations;
          {"\n\n"}You are solely responsible for any internet connection and/or mobile fees that you may incur as a result of using our Services. 
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}6. Intellectual Property{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  All content included as part of the Services, including but not limited to, text, graphics, logos, images, as well as the compilation thereof, the look and feel of the Services, including, without limitation, the text, graphics, code, and other materials contained hereon is property of the Company or its third-party suppliers, or is rightfully used subject to a license agreement between Company and a third-party and is protected by copyright, trademark, and other laws that protect intellectual property and proprietary rights. You agree to observe and abide by all copyright, trademark, and other proprietary notices, legends, or other restrictions contained in any such content and will not make any changes thereto.
          {"\n\n"}b)  You will not modify, publish, transmit, reverse engineer, participate in the transfer or sale, create derivative works of, or in any way exploit any of the content, in whole or in part, provided on, transmitted through, or found within the Services. Your use of the Services does not entitle you to make any unauthorized use of any such content, and in particular you shall not delete or alter any proprietary rights or attribution notices in such content. You shall use the content provided through, transmitted through, and found on the Services solely in compliance with the limited License set forth herein, and will make no other use of the Content without the express written permission of the Company and/or related third-party owners of such content. You acknowledge and agree that you do not acquire any ownership rights in the content provided through the Services. Except as provided herein, these Terms do not grant any licenses, express or implied, to such content or any other intellectual property of the Company, its licensors, or any third-party owner.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}7. Links to Third Party Sites and Services{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          The Services may contain links to third party websites (“Linked Sites”). The Linked Sites are not under the control of Company or any part of the Services. Company is not responsible for the contents of any Linked Site, including without limitation any link contained in a Linked Site, or any changes or updates to a Linked Site. Company is providing these links to you only as a convenience, and the inclusion of any link does not imply endorsement by Company of the website or any association with its operators.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}8. Disclaimer, Warranty, and Liability{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          YOU ACKNOWLEDGE THAT COMPANY AND COMPANY AFFILIATES ARE NOT LIABLE
          {"\n\n"}(1) FOR ANY INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY OR CONSEQUENTIAL DAMAGES, INCLUDING FOR LOSS OF PROFITS, GOODWILL OR DATA, IN ANY WAY WHATSOEVER ARISING OUT OF THE USE OF, OR INABILITY TO USE, THE SERVICES; OR
          {"\n\n"}(2) FOR THE CONDUCT OF THIRD-PARTIES, INCLUDING OTHER USERS OF THE SERVICE AND OPERATORS OF EXTERNAL SITES.
          {"\n\n"}THE SERVICES ARE PROVIDED BY COMPANY TO YOU ON AN “AS IS” AND “AS AVAILABLE” BASIS. COMPANY MAKES NO WARRANTIES OR REPRESENTATIONS OF ANY KIND, EXPRESS OR IMPLIED, AS TO THE OPERATION OF THE SERVICES, UNLESS SUCH WARRANTIES OR OTHER STATUTORY CONSUMER RIGHTS ARE LEGALLY INCAPABLE OF EXCLUSION OR LIMITATION IN YOUR LOCAL JURISDICTION. THE RISK OF USING THE SERVICES RESTS ENTIRELY WITH YOU AS DOES THE RISK OF INJURY FROM THE SERVICES. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, COMPANY DISCLAIMS ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION WARRANTIES OF NON INFRINGEMENT, IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. COMPANY DOES NOT WARRANT THAT THE SERVICES ARE FREE FROM VIRUSES OR OTHER HARMFUL COMPONENTS. 
          {"\n\n"}TO THE FULLEST EXTENT ALLOWED BY ANY LAW THAT APPLIES, THE DISCLAIMERS OF LIABILITY IN THESE TERMS APPLY TO ALL DAMAGES OR INJURY CAUSED BY THE SERVICES, OR RELATED TO USE OF, OR INABILITY TO USE, THE SERVICES, UNDER ANY CAUSE OF ACTION IN ANY JURISDICTION, INCLUDING, WITHOUT LIMITATION, ACTIONS FOR BREACH OF WARRANTY, BREACH OF CONTRACT OR TORT (INCLUDING NEGLIGENCE).
          {"\n\n"}TO THE MAXIMUM EXTENT PERMISSIBLE UNDER APPLICABLE LAWS, THE AGGREGATE LIABILITY OF COMPANY AND/OR COMPANY AFFILIATES ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT SHALL NOT EXCEED THE TOTAL AMOUNTS YOU HAVE PAID (IF ANY) TO COMPANY AND/OR COMPANY AFFILIATES IN THE ONE HUNDRED AND EIGHTY DAYS (180) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY CLAIM.
          {"\n\n"}IF YOU HAVE NOT PAID COMPANY OR ANY COMPANY AFFILIATE ANY AMOUNT IN THE ONE HUNDRED AND EIGHTY DAYS (180) DAYS IMMEDIATELY PRECEDING THE DATE ON WHICH YOU FIRST ASSERT ANY SUCH CLAIM, YOUR SOLE AND EXCLUSIVE REMEDY FOR ANY DISPUTE WITH COMPANY AND/OR ANY COMPANY AFFILIATE IS TO CEASE USING THE SERVICES.
          {"\n\n"}YOU REPRESENT AND WARRANT THAT YOU ARE NOT LOCATED IN A COUNTRY THAT IS SUBJECT TO A UNITED STATES GOVERNMENT EMBARGO, OR THAT HAS BEEN DESIGNATED BY THE UNITED STATES GOVERNMENT AS A “TERRORIST SUPPORTING” COUNTRY, AND YOU ARE NOT LISTED ON ANY UNITED STATES GOVERNMENT LIST OF PROHIBITED OR RESTRICTED PARTIES.
          {"\n\n"}SOME STATES, COUNTRIES, OR JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF CERTAIN WARRANTIES, OR THE EXCLUSION OR LIMITATION OF LIABILITY FOR CONSEQUENTIAL OR INCIDENTAL DAMAGES. IN SUCH STATES, COUNTRIES, OR JURISDICTIONS, COMPANY AND COMPANY AFFILIATES SHALL BE LIMITED TO THE MAXIMUM EXTENT PERMISSIBLE UNDER APPLICABLE LAWS, SUBJECT TO ANY APPLICABLE STATUTORY CONSUMER RIGHTS LAWS IN YOUR LOCAL JURISDICTION.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}9. Indemnity{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  You agree to defend, indemnify and hold harmless Company, Company Affiliates, and any third-parties under agreement with Company, and any employee, contractor, vendor, agent, supplier, licensee, customer, distributor, shareholder, director or officer of any of the foregoing, as well as any person using the Services and any person or entity that becomes aware of your use of the Services at any time, with respect to any and all claims, liabilities, judgments, awards, injuries, damages, losses, costs, fees, or expenses (including but not limited to attorney’s fees and costs) that arise under, from or in any way, directly or indirectly, relate to:
          {"\n\n"}i)  Your breach and/or failure to comply with any provision, obligation, representation, warranty, or covenant contained in these Terms of Service;
          {"\n\n"}ii)  Your use of the Services, including but not limited to economic, physical, emotional, psychological or privacy related considerations; and
          {"\n\n"}iii)  Your actions to knowingly affect the Services via any bloatware, malware, computer virus, worm, Trojan horse, spyware, adware, crimeware, scareware, rootkit or any other program installed in a way that executable code of any program is scheduled to utilize or utilizes processor cycles during periods of time when such program is not directly or indirectly being used.
          {"\n\n"}b)  Company and Company Affiliates reserve the right, but not the obligation, at their own expense, to assume the exclusive defense and control of any matter otherwise subject to indemnification by you. 
          {"\n\n"}c)  You acknowledge, and further agree that Company has no obligation to defend, indemnify or hold harmless you in any way related to these Terms, including but not limited to your use of the Services, use of the Services by any person, or any connection between the foregoing and any other person or entity that becomes aware of your use of the Services at any time.
          {"\n\n"}d)  This Section shall survive the termination of these Terms.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}10. Dispute Resolution{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  <Text style={styles.boldText}>Informal Resolution.</Text> With respect to any Dispute, you agree to attempt to negotiate the resolution of any Dispute informally for at least thirty (30) days before initiating any arbitration or other proceeding, including any legal proceeding in court or before an administrative agency. Such informal negotiations commence upon Company’s receipt of Notice from you.
          {"\n\n"}b)  <Text style={styles.boldText}>Mandatory Binding Arbitration.</Text> If you are not able to satisfactorily resolve a Dispute informally within a total of thirty (30) days, or if Company, in its sole and absolute discretion, determines that it will not be possible to satisfactorily resolve that Dispute informally within a total of thirty (30) days, you agree that either you or Company may request resolution by final and fully binding arbitration conducted under the Commercial Arbitration Rules of the American Arbitration Association. The party requesting that a Dispute be resolved by arbitration under this Section shall be responsible for initiating such a proceeding. 
          {"\n\n"}i)  The American Arbitration Association (“AAA”) will run the arbitration between you and Company, and AAA’s rules and procedures (including their Supplementary Procedures for Consumer-Related Disputes, if applicable) will be used. If something in these Terms is different than AAA’s rules and procedures, then we will follow these Terms instead. You can look at AAA’s rules and procedures on their website www.adr.org or you can call them at 1-800-778-7879.
          {"\n\n"}ii)  YOU UNDERSTAND, AND FURTHER AGREE, THAT YOU HAVE THE RIGHT TO CONSULT WITH INDEPENDENT LEGAL COUNSEL OF YOUR OWN CHOOSING REGARDING THIS AND ANY OTHER PROVISION IN THIS AGREEMENT AND THAT THIS BINDING ARBITRATION PROVISION WILL ELIMINATE YOUR LEGAL RIGHT TO SUE IN COURT, TO HAVE A JURY TRIAL, AND/OR TO PARTICIPATE IN A CLASS ACTION WITH RESPECT TO ANY SUCH DISPUTE. You and Company both agree that neither shall attempt to have any other arbitration or class action related to any other party joined to any arbitration in which you are involved with Company. To the fullest extent permitted by law, no arbitration proceeding shall be decided on a class-action basis or utilizing class action procedures. You and Company further agree that each may bring claims against the other only in an individual capacity, and not as a plaintiff or a class member in any purported class or representative proceeding.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}11. Miscellaneous{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          a)  <Text style={styles.boldText}>Changes.</Text> It is your responsibility to read, understand, and accept this agreement in connection with your use of the Services. You acknowledge that Company may make changes to these Terms of Service at any time, and that Section headings in this agreement are for purposes of convenience only. Unless Company states otherwise, any changes to these Terms are effective when posted. If you continue to use the Services after any changes are posted then you agree that those changes will apply to your continued use of the Services and that such use constitutes your acceptance of the same. You should check this page or the settings within the App regularly to stay informed about any changes. 
          {"\n\n"}b)  <Text style={styles.boldText}>Complete agreement.</Text> This agreement: (1) is the final and complete agreement and understanding of the parties concerning the subject matter hereof, and supersedes and replaces any and all prior and contemporaneous agreements and understandings with respect thereto; (2) may not be changed, amended, or in any manner modified by you except as authorized in a writing signed by both parties’ authorized agents; (3) is not assignable, except to a successor in interest to substantially all of a party’s business or assets and any other attempt to assign or transfer this agreement or any interest herein is void; and (4) shall be binding upon, and inure to the benefit of, the parties hereto, their respective heirs, executors, administrators, successors, personal representatives, licensees, and assigns. 
          {"\n\n"}c)  <Text style={styles.boldText}>Force Majeure.</Text> No party shall be responsible for delays or failure of performance resulting from acts beyond the reasonable control of such party, including, war, terrorism, acts of public enemies, strikes or other labor disturbances, power failures, fires, floods, earthquakes, acts of God, and other natural disasters.
          {"\n\n"}d)  <Text style={styles.boldText}>Waiver.</Text> No act or failure to act by Company will be deemed a waiver of any right contained in this agreement, and any waiver by Company must be in writing and signed by an officer of Company. If Company does expressly waive any provision of this agreement, such waiver shall not be a waiver of any other provisions of this agreement, and the waived provision shall not be waived for all time in the future.
          {"\n\n"}e)  <Text style={styles.boldText}>Severability.</Text> If any provision or sub-provision of this agreement is found to be invalid or unenforceable, the remainder shall be enforced as fully as possible and the unenforceable provision or sub-provision shall be deemed modified to the limited extent required to permit its enforcement in a manner most closely representing the intention of the parties as expressed herein.
          {"\n\n"}f)  <Text style={styles.boldText}>Remedies.</Text> You acknowledge and agree that any violation or threatened violation of this agreement will cause irreparable injury to Company, entitling Company to seek injunctive relief without the necessity of proving actual damages, in addition to all other remedies at law or in equity.  You specifically acknowledge that money damages alone would be an inadequate remedy for the injuries and damages that would be suffered and incurred by Company as a result of a breach of any of the provisions of this agreement. 
          {"\n\n"}g)  <Text style={styles.boldText}>Governing Law and Venue.</Text> Any dispute or claim arising out of or related to this agreement shall be governed by and construed in accordance with the laws of the State of Connecticut without reference to any choice or conflict of laws principles.  Unless subject to arbitration under Section 10, the Courts in the State of California shall have exclusive jurisdiction over any legal suit, action, or proceeding arising out of, or relating to, disputes or claims that might arise under these Terms.  Accordingly, the parties hereby consent to the personal jurisdiction of the Courts in the State of California, and hereby waive any and all jurisdictional or venue defenses otherwise available to them.
          {"\n\n"}h)  <Text style={styles.boldText}>Language.</Text> To the fullest extent permitted by law, the controlling language for these Terms of Service is English.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}12. Electronic Communication{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          Each and every time you either use the Services or send an email or other electronic communication to Company, such communication will constitute an electronic communication. By using the Services, you consent to receive electronic communications and you agree that all agreements, notices, disclosures and other communications that Company provides to you via electronic communication, individually and collectively, satisfy any legal requirement that such communications be in writing.
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}13. Apple Enabled Services Application{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          The Services operate in connection with products made commercially available by Apple, Inc. (“<Text style={styles.boldText}>Apple</Text>”), in addition to other devices and operating systems. With respect to Services that are made available to you in connection with an Apple-branded product (such Services shall hereinafter be known as “<Text style={styles.boldText}>Apple-Enabled Services</Text>”), the following terms and conditions apply, in addition to the terms and conditions set forth in these Terms: 
          {"\n\n"}a)  You and Company acknowledge that these Terms operate between you and Company only and not with Apple and that as between Company and Apple, Company, not Apple, is responsible for the Apple-Enabled Services and the content thereof; 
          {"\n\n"}b)  You acknowledge that the Apple iOS App Store (“<Text style={styles.boldText}>App Store</Text>”) contains rules and conditions that govern the use of software made available therein (collectively “<Text style={styles.boldText}>Usage Rules</Text>”). Such Usage Rules are contained within the App Store Terms of Service (“<Text style={styles.boldText}>App Store Terms</Text>”). Regarding the Services, you may not use the Apple-Enabled Services in any manner that is in violation of or inconsistent with these Usage Rules or the App Store Terms;
          {"\n\n"}c)  Your license to use the Apple-Enabled Services is limited to a non-transferable license to use the Apple-Enabled Services on an iOS product that you own or control, as permitted by the Usage Rules set forth in the App Store Terms. 
          {"\n\n"}d)  You acknowledge that Apple has no obligation whatsoever to provide any maintenance or support services with respect to the Apple-Enabled Services;
          {"\n\n"}e)  You acknowledge that Apple is not responsible for any product or software warranties, whether express or implied by law. In the event of any failure of Apple-Enabled Services to conform to any applicable warranty, you may notify Apple, via the methods described in the App Store, and Apple will refund the purchase price for the Apple Enabled Services to you, if any; and, to the maximum extent permitted by applicable law, Apple will have no other warranty obligation whatsoever with respect to the Apple-Enabled Services, or any other claims, losses, liabilities, damages, costs, or expenses attributable to any failure to conform to any warranty, to the extent that it cannot be disclaimed under applicable law. For a discussion of any warranties related to the Services, please see the section herein entitled “Disclaimer and Limitation of Liability;” 
          {"\n\n"}f)  Company and you acknowledge that Company, not Apple, is responsible for addressing any claims of you or any third party relating to the Apple-Enabled Services or your possession and/or use of those Apple-Enabled Services, including but not limited to i) product liability claims; ii) any claim that the Apple-Enabled Services fail to conform to any applicable legal or regulatory requirement; and iii) claims arising under consumer protection or similar legislation; 
          {"\n\n"}g)  In the event of any third party claim that the Apple-Enabled Services or the end-user’s possession and use of those Apple-Enabled Services infringes that third party’s intellectual property rights, as between Company and Apple, Company, not Apple, will be solely responsible for the investigation, defense, settlement, and discharge of any such intellectual property infringement claim; 
          {"\n\n"}h)  You represent and warrant that i) you are not located in any country that is subject to a U.S. government embargo, or that has been designated by the U.S. Government as a “terrorist supporting” country; ii) you are not listed on any U.S. Government list of prohibited or restricted parties; and iii) you are not located in any other country or jurisdiction from which you would be barred from using the Services  by applicable law; and 
          {"\n\n"}i)  If you have any complaints, questions, comments, or concerns with respect to the Apple-Enabled Services, you should direct them to:
        </Text>

        <Text style={[styles.contentText, styles.boldText]}>
        {"\n"}14. Contact Us{"\n"}
        </Text>
        <Text style={[styles.contentText, styles.paddingLeft]}>
          If you have any questions or comments about these Terms or our Services, please contact us at: {renderEmail("contact@pluzo.com")}
        </Text>
      </View>
    )
  }

  return (
    <Screen hasGradient style={styles.flexFill}>
      <SafeAreaView style={styles.flexFill}>
        <View style={styles.flexFill}>
          <Header
            title={isPrivacy ? "Privacy Policy" : "Terms of Service"}
            onBack={props.navigation.goBack}
          />

          <ScrollView
            style={styles.flexFill}
            contentContainerStyle={styles.contentContainer}
          >
            {
              isPrivacy ? (
                renderPrivacy()
              ) : (
                renderTos()
              )
            }
          </ScrollView>
        </View>
      </SafeAreaView>
    </Screen>
  );
};

export default TermsOfService;
