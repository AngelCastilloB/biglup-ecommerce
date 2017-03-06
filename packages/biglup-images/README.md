biglup:ufs-google-cloud
=========================

A Meteor package that adds Google Cloud support for UploadFS.

## Installation

Install using Meteor. When in a Meteor app directory, enter:

```
$ meteor add biglup:ufs-google-cloud
```

## Usage

Put the necessary information into your S3 store options, like so:

```js

const Photos = new Mongo.Collection('photos');

const photosStore = new UploadFS.store.GoogleCloudStorage({
    collection: Photos,
    name: 'photos',
    chunkSize: 1024 * 255,
    bucket: "my-bucket", //required
    projectId: "my-gcs-project", // Google Cloud storage project id; required if not set in environment variables
    credentials: "secret", // Google Cloud storage storage access key.
    folder: "folder/in/bucket", //optional, which folder (key prefix) in the container to use
});
```
```

You can get your project key under the IAM & Admin section of your Google Cloud Storage console under 'Service Accounts'.

Once there, click "CREATE SERVICE ACCOUNT", give it a Service account name and role. Make sure you give the service account
at least the role of Project -> Editor.

## Cross-Origin Resource Sharing (CORS)

Configure the CORS of the bucket so it can interact with the web application (read more here https://cloud.google.com/storage/docs/cross-origin).

Use the gsutil:

gsutil cors set cors-json-file.json gs://example

Where cors-json-file.json contains:

```json
[
  {
    "origin": ["*"],
    "responseHeader": ["Content-Type"],
    "method": ["GET", "POST", "PUT", "HEAD"],
    "maxAgeSeconds": 3000
  }
]
});
```
```

## Authentication

See https://googlecloudplatform.github.io/google-cloud-node/#/docs/google-cloud/0.30.3/guides/authentication

### Client, Server, and Google Cloud Storage credentials

There are two approaches to safely storing your S3 credentials:

1. As system environment variables.
2. As given in the above code but located in a directory named `server` (note: wrapping in `Meteor.isServer` is **NOT**
secure).

**For Step 2:**

You need to define your store in two files: one located in a `server` director and one located in a `client` directory. In the client-side-only file, simply don't define any options when creating your Store.