# 🚀 GitHub Actions Workflows

This directory contains the CI/CD pipelines for the TravelGen project.

## 📁 Workflow Files

| File | Purpose | Triggers |
|------|---------|----------|
| [`ci.yml`](./ci.yml) | Continuous Integration - Testing & Linting | Push/PR to main/develop |
| [`build.yml`](./build.yml) | Build and Package Applications | Push/PR to main/develop |
| [`deploy.yml`](./deploy.yml) | Deploy to Staging/Production | Push to main, manual |
| [`security.yml`](./security.yml) | Security & Dependency Scanning | Push/PR, weekly, manual |
| [`docker.yml`](./docker.yml) | Docker Build & Deploy | Push/PR, tags, manual |

## 🎯 Quick Start

1. **Enable GitHub Actions** in your repository
2. **Add required secrets** (see documentation)
3. **Configure environments** (staging/production)
4. **Push code** to trigger pipelines

## 📖 Documentation

See [`../CI_CD_DOCUMENTATION.md`](../CI_CD_DOCUMENTATION.md) for comprehensive documentation.

## 🔧 Required Secrets

- `STAGING_SSH_KEY` - SSH key for staging server
- `PRODUCTION_SSH_KEY` - SSH key for production server  
- `SNYK_TOKEN` - Security scanning token
- `SLACK_WEBHOOK` - Deployment notifications
- `VERCEL_TOKEN` - Vercel deployment
- `KUBE_CONFIG` - Kubernetes configuration

## 🌍 Environments

- **staging** - Testing environment
- **production** - Live environment (requires approval)

## 📊 Pipeline Status

[![CI](https://github.com/yourusername/travelgen/actions/workflows/ci.yml/badge.svg)](https://github.com/yourusername/travelgen/actions/workflows/ci.yml)
[![Build](https://github.com/yourusername/travelgen/actions/workflows/build.yml/badge.svg)](https://github.com/yourusername/travelgen/actions/workflows/build.yml)
[![Security](https://github.com/yourusername/travelgen/actions/workflows/security.yml/badge.svg)](https://github.com/yourusername/travelgen/actions/workflows/security.yml)
[![Docker](https://github.com/yourusername/travelgen/actions/workflows/docker.yml/badge.svg)](https://github.com/yourusername/travelgen/actions/workflows/docker.yml)
