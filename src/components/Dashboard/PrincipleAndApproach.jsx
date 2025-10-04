// CompanyPrinciples.jsx
import React from "react";
import { Box, Grid, Typography, Stack, Divider } from "@mui/material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

const visionPoints = [
    "Here, “Quality Is An Assurance”.",
    "Driven by the concept of Quality as Priority, our team strives to foster a reputable and dynamic firm that excels in its operations, serving the best interests of our clients.",
    "We aim to provide opportunities for prosperity and growth to all those associated with us, becoming a leader in our respective areas of expertise.",
    "At IGCA, we are trailblazers for growth and pioneers of quality work.",
];

const valuesPoints = [
    "We help our clients grow.",
    "Excellence: at the core of everything we do.",
    "Integrity: guiding our actions, fostering trust and inspiring excellence.",
    "Commitment: the unwavering dedication and relentless pursuit of excellence that fuels success.",
    "Collaboration: powering innovation and achieving greatness through synergy and shared expertise.",
    "Prosperity: enhancing achievement.",
    "Diversity & Inclusivity.",
];

const approachPoints = [
    "Holistic collaborations that yield effective results.",
    "Tailored solutions driven by a thorough understanding of our clients’ needs.",
    "Confidentiality and security are our top priorities, safeguarding client information with utmost care.",
    "Human capital and leadership advancement drive success.",
    "Our unwavering service standards set us apart.",
];

/** One row (text + image). Always text-left / image-right on md+; stacks on xs */
function PrincipleRow({ title, points, img, reverse = false }) {
    return (
        <Grid
            container
            alignItems="center"
            columnSpacing={{ xs: 2, md: 4 }}
            rowSpacing={{ xs: 3, md: 0 }}
            sx={{ flexWrap: { xs: "wrap", md: "nowrap" }, py: { xs: 3, md: 5 } }}
        >
            {/* Text — 60% on md+ */}
            <Grid
                item
                xs={12}
                md="auto"
                sx={{
                    order: { xs: 1, md: reverse ? 2 : 1 },
                    flex: { md: "0 0 60%" },
                    maxWidth: { md: "60%" },
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 900, color: "#0f2555", mb: 2 }}>
                    {title}
                </Typography>
                <Stack spacing={1.25}>
                    {points.map((p, i) => (
                        <Stack key={i} direction="row" spacing={1.25} alignItems="flex-start">
                            <CheckCircleRoundedIcon sx={{ color: "#22c55e", mt: "2px" }} />
                            <Typography sx={{ color: "#334155", fontSize: { xs: 14, md: 15 }, lineHeight: 1.7 }}>
                                {p}
                            </Typography>
                        </Stack>
                    ))}
                </Stack>
            </Grid>

            {/* Image — 40% on md+ */}
            <Grid
                item
                xs={12}
                md="auto"
                sx={{
                    order: { xs: 2, md: reverse ? 1 : 2 },
                    flex: { md: "0 0 40%" },
                    maxWidth: { md: "40%" },
                }}
            >
                <Box
                    component="img"
                    src={img}
                    alt={title}
                    sx={{
                        width: "100%",
                        height: { xs: 220, sm: 280, md: 340 },
                        objectFit: "cover",
                        borderRadius: 2,
                        boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
                    }}
                />
            </Grid>
        </Grid>
    );
}


export default function CompanyPrinciples({ fullBleed = false }) {
    return (
        <Box
            sx={{
                pt: fullBleed ? 0 : { xs: 6, sm: 8, md: 12 },
                pb: { xs: 6, sm: 8, md: 12 },
                px: fullBleed ? { xs: 2, sm: 3, md: 4 } : { xs: 2, sm: 3, md: 4, lg: 6 },

                bgcolor: "#fff",
                ...(fullBleed
                    ? { width: "100vw", maxWidth: "100vw", mx: "calc(50% - 50vw)" }
                    : { maxWidth: { xs: "100%", lg: 1240, xl: 1440 }, mx: "auto" }),
            }}
        >
            <Typography
                align="center"
                sx={{
                    fontWeight: 900,
                    color: "#0f2555",
                    fontSize: { xs: 26, sm: 32, md: 40 },
                    letterSpacing: 0.3,
                    mb: 1,
                }}
            >
                Principles Of Our Company
            </Typography>

            <Typography
                align="center"
                sx={{
                    color: "#64748b",
                    maxWidth: 820,
                    mx: "auto",
                    mb: { xs: 4, md: 6 },
                    fontSize: { xs: 13, md: 15 },
                }}
            >
                Our company adheres to unwavering success principles guided by integrity and
                excellence.
            </Typography>

            {/* Text-left / Image-right on all three */}
            <PrincipleRow title="Our Vision" points={visionPoints} img="/who1.png" />
            <Divider sx={{ my: { xs: 3, md: 5 }, borderColor: "rgba(15,37,85,0.15)", borderStyle: "dashed" }} />
            <PrincipleRow title="Our Values" points={valuesPoints} img="/who2.png" reverse />  {/* image first */}
            <Divider sx={{ my: { xs: 3, md: 5 }, borderColor: "rgba(15,37,85,0.15)", borderStyle: "dashed" }} />
            <PrincipleRow title="Our Approach" points={approachPoints} img="/who3.png" />

        </Box>
    );
}
