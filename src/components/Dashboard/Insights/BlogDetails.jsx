// src/pages/BlogDetail.jsx
import React, { useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import blog1 from "../../../Data/Blog/blog1";
import blog2 from "../../../Data/Blog/blog2";
import blog3 from "../../../Data/Blog/blog3";

export default function BlogDetails() {
  const { slug } = useParams();
  const ALL_BLOGS = [...blog1, ...blog2,...blog3];
  const post = ALL_BLOGS.find(b => b.slug === slug);

  useEffect(() => window.scrollTo(0, 0), [slug]);

  if (!post) {
    return (
      <Box sx={{ maxWidth: 900, mx: "auto", py: 8, px: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Article not found
        </Typography>
        <Link component={RouterLink} to="/insights-blog" underline="hover">Back to Insights</Link>
      </Box>
    );
  }

  return (
    <Box sx={{ bgcolor: "#fff", py: { xs: 5, md: 8 }, px: { xs: 2, md: 0 } }}>
      <Box sx={{ maxWidth: 900, mx: "auto" }}>
        <Breadcrumbs sx={{ mb: 2 }}>
          <Link component={RouterLink} to="/" underline="hover" color="inherit">Home</Link>
          <Link component={RouterLink} to="/insights-blog" underline="hover" color="inherit">Insights</Link>
          <Typography color="text.primary">{post.title}</Typography>
        </Breadcrumbs>

        <Typography component="h1" sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 800, mb: 2 }}>
          {post.title}
        </Typography>

        <Typography sx={{ color: "#6b7280", mb: 2 }}>
          {post.tag} · {post.readTime}
        </Typography>

        {post.image && (
          <Box
            component="img"
            src={post.image}
            alt={post.title}
            sx={{ width: "100%", borderRadius: 2, mb: 3 }}
            loading="lazy"
          />
        )}

        {/* Render stored HTML safely for your own curated content */}
        <Box
          sx={{
            "& h1, & h2, & h3": { fontWeight: 700, mt: 3, mb: 1 },
            "& p, & li": { fontSize: { xs: 14, md: 16 }, lineHeight: 1.8 },
            "& ul": { pl: 3, mb: 2 },
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Box>
    </Box>
  );
}
