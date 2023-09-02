Overview

This package contains the integration tests for Lambda application. Out of the box, the tests can be executed via Hydra or from local machine. This package uses JUnit5 as testing library, built with HappierTrails-3.5 and JDK11.
Running tests via Hydra

If this package was created via BONES CLI, Hydra resources and configurations should be created automatically for you in CDK packages. To run the tests via Hydra, simply push your change and let Pipelines trigger them via Hydra.

If you want to wire up Hydra configurations yourself, check out the official Hydra guide and use this run definition:

    {
      "SchemaVersion": "1.0",
      "SchemaType": "HydraJavaJUnit",
      "HydraParameters": {
        "Runtime": "java11",
        "ComputeEngine": "Lambda"
      },
      "HandlerParameters": {
        "TestClasses": {
          "PackageSelector": [{
            "Package": "com.amazon.chimedocsharelambda",
            "ClassNamePattern": ".*Test"
          }]
        }
      }
    }

Running tests from local machine
Prerequisites

The tests requires AWS credentials that have, at least, the same permissions as your Hydra invocation role. You need to make sure your credentials are available in your environment. One option is to use ADA.

Read more on how credentials are retrieved here.
Running tests against alpha stage:

Simply run:

brazil-build alpha-integ-tests

Running tests against other stage:

As your service grows or you add some personal development stack to your service, you can also run the tests against them. Let's say you want to add support for dev stage, add the following lines to your build.xml file:

  <target name="set-dev">
    <property name="tests.additional.jvmargs" value="-DAWS_REGION=us-west-2" />
  </target>

  <target name="dev-integ-tests" depends="set-dev,test-integration-assert" />

Update the region accordingly if you don't use us-west-2

Make sure that you have your AWS credentials ready in your environment (see prerequisites), then run:

brazil-build dev-integ-tests

