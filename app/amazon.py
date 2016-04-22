# code based on the https://github.com/doobeh/Flask-S3-Uploader repository

from uuid import uuid4
import boto
from flask import current_app as app


def s3_upload(source_file, extension, upload_dir=None, acl='public-read'):

    if upload_dir is None:
        upload_dir = app.config["S3_UPLOAD_DIRECTORY"]

    source_extension = extension

    destination_filename = uuid4().hex + source_extension

    # Connect to S3 and upload file.
    conn = boto.connect_s3(app.config["S3_KEY"], app.config["S3_SECRET"])
    b = conn.get_bucket(app.config["S3_BUCKET"])

    sml = b.new_key("/".join([upload_dir, destination_filename]))
    sml.set_contents_from_string(source_file)
    sml.set_acl(acl)

    return app.config["S3_LOCATION"] + '/' + app.config["S3_BUCKET"] + app.config["S3_UPLOAD_DIRECTORY"] + '/' + destination_filename
