import { Box } from "@mui/material";
import { PageFooter } from "../components/sections/PageFooter";
import { Section } from "../components/sections/Section";
import { Navigation } from "../components/sections/Navigation";

export const Privacy = () => {
  return (
    <Box>
      <Navigation />
      <Section>
        <>
          <Box sx={{ width: "100%", position: "relative" }}>
            <Box sx={{ position: "absolute", top: "-30px", right: "0" }}>
              <p>13.01.2024</p>
            </Box>
            <h1>Privacy Policy</h1>
            <h2>1. Introduction</h2>
            <p>
              Waill is committed to safeguarding the privacy of its users and
              complying with the principles outlined in the
              Datenschutz-Grundverordnung (DSGVO), the General Data Protection
              Regulation. This Privacy Policy outlines how Waill collects, uses,
              and safeguards personal information.
            </p>
            <h2>2. Information Collected</h2>
            <p>
              Waill collects user data for identification and authorization
              purposes. This may include personal information such as names,
              email addresses, and user credentials. Additionally, Waill saves
              information about documents and messages for functional purposes
              to deliver the advertised services effectively.
            </p>
            <h2>3. Sharing with Third Parties</h2>
            <p>
              Waill shares data with third parties such as OpenAI solely for the
              purpose of handling the authorization process and providing the
              advertised service. We ensure that these third parties adhere to
              data protection regulations and use the information only for the
              intended purpose.
            </p>
            <h2>4. Protection of Sensitive Information</h2>
            <p>
              Waill acknowledges the sensitivity of user data, especially
              information like OpenAI API Keys. We employ industry-standard
              security measures and take all necessary precautions to ensure the
              safe handling of such valuable information.
            </p>
            <h2>5. Data Retention</h2>
            <p>
              Waill retains user data only for the duration necessary to fulfill
              the purposes outlined in this Privacy Policy. Once the data is no
              longer required, it will be securely deleted.
            </p>
            <h2>6. User Rights</h2>
            <p>
              Users have the right to access, correct, or delete their personal
              information. Waill provides mechanisms for users to exercise these
              rights, and inquiries regarding data protection can be directed to
              contact@waill.net.
            </p>
            <h2>7. Changes to the Privacy Policy</h2>
            <p>
              This Privacy Policy may be updated from time to time. Users will
              be notified of any changes, and the updated policy will be made
              available on the Waill website.
            </p>
            <h2>8. Consent</h2>
            <p>
              By using Waill's services, users consent to the practices outlined
              in this Privacy Policy.
            </p>
            <p>
              For any questions or concerns regarding this Privacy Policy or the
              handling of personal data, please contact contact@waill.net.
            </p>
          </Box>
        </>
      </Section>
      <PageFooter />
    </Box>
  );
};
