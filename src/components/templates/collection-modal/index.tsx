import { ProductCollection } from "@medusajs/medusa"
import {
  useAdminCreateCollection,
  useAdminUpdateCollection,
} from "medusa-react"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import useNotification from "../../../hooks/use-notification"
import { getErrorMessage } from "../../../utils/error-messages"
import Button from "../../fundamentals/button"
import IconTooltip from "../../molecules/icon-tooltip"
import InputField from "../../molecules/input"
import Modal from "../../molecules/modal"
import TextArea from "../../molecules/textarea"
import Metadata, { MetadataField } from "../../organisms/metadata"

type CollectionModalProps = {
  onClose: () => void
  onSubmit: (values: any, metadata: MetadataField[]) => void
  isEdit?: boolean
  collection?: ProductCollection
}

type CollectionModalFormData = {
  title: string
  handle: string | undefined
  about: unknown
  short_description: unknown
  image1: unknown
  image3: unknown
  image2: unknown
  image4: unknown
  icon1: unknown
  icon2: unknown
  icon3: unknown
  icon4: unknown
  feature1: unknown
  feature2: unknown
  feature3: unknown
  feature4: unknown
  featureDesc1: unknown
  featureDesc2: unknown
  featureDesc3: unknown
  featureDesc4: unknown
  careinstructions: unknown
  widthSize: unknown
  heightSize: unknown
}
const CollectionModal: React.FC<CollectionModalProps> = ({
  onClose,
  isEdit = false,
  collection,
}) => {
  const { mutate: update, isLoading: updating } = useAdminUpdateCollection(
    collection?.id!
  )
  const { mutate: create, isLoading: creating } = useAdminCreateCollection()

  const { register, handleSubmit, reset } = useForm<CollectionModalFormData>()

  const notification = useNotification()
  const [metadata, setMetadata] = useState<MetadataField[]>([])
  const feature = [
    {
      name: "Key Feature No.1",
      featureTitle: "Title",
      featureDesc: "Description",
      register1: { ...register("icon1") },
      register2: { ...register("feature1") },
      register3: { ...register("featureDesc1") },
    },
    {
      name: "Key Feature No.2",
      featureTitle: "Title",
      featureDesc: "Description",
      register1: { ...register("icon2") },
      register2: { ...register("feature2") },
      register3: { ...register("featureDesc2") },
    },
    {
      name: "Key Feature No.3",
      featureTitle: "Title",
      featureDesc: "Description",
      register1: { ...register("icon3") },
      register2: { ...register("feature3") },
      register3: { ...register("featureDesc3") },
    },
    {
      name: "Key Feature No.4",
      featureTitle: "Title",
      featureDesc: "Description",
      register1: { ...register("icon4") },
      register2: { ...register("feature4") },
      register3: { ...register("featureDesc4") },
    },
  ]
  const imageList = [
    {
      name: "Image No.1",
      register: { ...register("image1") },
    },
    {
      name: "Image No.2",
      register: { ...register("image2") },
    },
    {
      name: "Image No.3",
      register: { ...register("image3") },
    },
    {
      name: "Image No.4",
      register: { ...register("image4") },
    },
  ]
  if (isEdit && !collection) {
    throw new Error("Collection is required for edit")
  }

  useEffect(() => {
    register("title", { required: true })
    register("handle")
  }, [])

  useEffect(() => {
    if (isEdit && collection) {
      reset({
        title: collection.title,
        handle: collection.handle,
        about: collection.metadata.about,
        short_description: collection.metadata.short_description,
        image1: collection.metadata.image1,
        image2: collection.metadata.image2,
        image3: collection.metadata.image3,
        image4: collection.metadata.image4,
        icon1: collection.metadata.icon1,
        icon2: collection.metadata.icon2,
        icon3: collection.metadata.icon3,
        icon4: collection.metadata.icon4,
        feature1: collection.metadata.feature1,
        feature2: collection.metadata.feature2,
        feature3: collection.metadata.feature3,
        feature4: collection.metadata.feature4,
        featureDesc1: collection.metadata.featureDesc1,
        featureDesc2: collection.metadata.featureDesc2,
        featureDesc3: collection.metadata.featureDesc3,
        featureDesc4: collection.metadata.featureDesc4,
        careinstructions: collection.metadata.careinstructions,
        widthSize: collection.metadata.widthSize,
        heightSize: collection.metadata.heightSize,
      })

      if (collection.metadata) {
        Object.entries(collection.metadata).map(([key, value]) => {
          if (typeof value === "string") {
            const newMeta = metadata
            newMeta.push({ key, value })
            setMetadata(newMeta)
          }
        })
      }
    }
  }, [collection, isEdit])

  const submit = (data: CollectionModalFormData) => {
    const string = "apple, orange, pear, banana, raspberry, peach"
    const string2 = data.heightSize
    const changeArray = string2.split(",")
    console.log(changeArray)

    if (isEdit) {
      const updateData = metadata.reduce((acc, next) => {
        return {
          ...acc,
          [next.key]: next.value,
        }
      }, {})
      ;(updateData["about"] = data.about),
        (updateData["short_description"] = data.short_description),
        (updateData["image1"] = data.image1),
        (updateData["image2"] = data.image2),
        (updateData["image3"] = data.image3),
        (updateData["image4"] = data.image4),
        (updateData["icon1"] = data.icon1),
        (updateData["icon2"] = data.icon2),
        (updateData["icon3"] = data.icon3),
        (updateData["icon4"] = data.icon4),
        (updateData["feature1"] = data.feature1),
        (updateData["feature2"] = data.feature2),
        (updateData["feature3"] = data.feature3),
        (updateData["feature4"] = data.feature4),
        (updateData["featureDesc1"] = data.featureDesc1),
        (updateData["featureDesc2"] = data.featureDesc2),
        (updateData["featureDesc3"] = data.featureDesc3),
        (updateData["featureDesc4"] = data.featureDesc4),
        (updateData["careinstructions"] = data.careinstructions),
        (updateData["widthSize"] = data.widthSize),
        (updateData["heightSize"] = data.heightSize),
        update(
          {
            title: data.title,
            handle: data.handle,
            metadata: updateData,
          },
          {
            onSuccess: () => {
              notification(
                "Success",
                "Successfully updated collection",
                "success"
              )
              onClose()
            },
            onError: (error) => {
              notification("Error", getErrorMessage(error), "error")
            },
          }
        )
    } else {
      const createData = metadata.reduce((acc, next) => {
        return {
          ...acc,
          [next.key]: next.value,
        }
      }, {})
      ;(createData["about"] = data.about ? data.about : undefined),
        (createData["short_description"] = data.short_description
          ? data.short_description
          : undefined),
        (createData["image1"] = data.image1 ? data.image1 : undefined),
        (createData["image2"] = data.image2 ? data.image2 : undefined),
        (createData["image3"] = data.image3 ? data.image3 : undefined),
        (createData["image4"] = data.image4 ? data.image4 : undefined),
        (createData["icon1"] = data.icon1 ? data.icon1 : undefined),
        (createData["icon2"] = data.icon2 ? data.icon2 : undefined),
        (createData["icon3"] = data.icon3 ? data.icon3 : undefined),
        (createData["icon4"] = data.icon4 ? data.icon4 : undefined),
        (createData["feature1"] = data.feature1 ? data.feature1 : undefined),
        (createData["feature2"] = data.feature2 ? data.feature2 : undefined),
        (createData["feature3"] = data.feature3 ? data.feature3 : undefined),
        (createData["feature4"] = data.feature4 ? data.feature4 : undefined),
        (createData["featureDesc1"] = data.featureDesc1
          ? data.featureDesc1
          : undefined),
        (createData["featureDesc2"] = data.featureDesc2
          ? data.featureDesc2
          : undefined),
        (createData["featureDesc3"] = data.featureDesc3
          ? data.featureDesc3
          : undefined),
        (createData["featureDesc4"] = data.featureDesc4
          ? data.featureDesc4
          : undefined),
        (createData["careinstructions"] = data.careinstructions
          ? data.careinstructions
          : undefined),
        (createData["widthSize"] = data.widthSize ? data.widthSize : undefined),
        (createData["heightSize"] = data.heightSize
          ? data.heightSize
          : undefined)
      create(
        {
          title: data.title,
          handle: data.handle,
          metadata: createData,
        },
        {
          onSuccess: () => {
            notification(
              "Success",
              "Successfully created collection",
              "success"
            )
            onClose()
          },
          onError: (error) => {
            notification("Error", getErrorMessage(error), "error")
          },
        }
      )
    }
  }

  return (
    <Modal handleClose={onClose} isLargeModal>
      <Modal.Body>
        <Modal.Header handleClose={onClose}>
          <div>
            <h1 className="inter-xlarge-semibold mb-2xsmall">
              {isEdit ? "Edit Collection" : "Add Collection"}
            </h1>
            <p className="inter-small-regular text-grey-50">
              To create a collection, all you need is a title and a handle.
            </p>
          </div>
        </Modal.Header>
        <form onSubmit={handleSubmit(submit)}>
          <Modal.Content>
            <div>
              <h2 className="inter-base-semibold mb-base">Details</h2>
              <div className="flex items-center gap-x-base">
                <InputField
                  label="Title"
                  required
                  placeholder="Sunglasses"
                  {...register("title", { required: true })}
                />
                <InputField
                  label="Handle"
                  placeholder="sunglasses"
                  {...register("handle")}
                  prefix="/"
                  tooltip={
                    <IconTooltip content="URL Slug for the collection. Will be auto generated if left blank." />
                  }
                />
              </div>
              <div className="mt-4 items-center gap-x-base">
                <TextArea
                  label="Short Description"
                  placeholder="Short Description Collection"
                  {...register("short_description")}
                />
              </div>
              <div className="mt-4 items-center gap-x-base">
                <TextArea
                  label="About"
                  placeholder="Description Collection"
                  {...register("about")}
                />
              </div>
              <div className="my-4 rounded-lg border bg-transparent p-4">
                <p className="text-lg font-bold">Collection Image</p>
                {imageList.map((items: any, index: number) => (
                  <div
                    className="mt-4 flex items-center gap-x-base"
                    key={index}
                  >
                    <InputField
                      label={items.name}
                      placeholder="Link Images"
                      {...items.register}
                    />
                  </div>
                ))}
              </div>
              {feature.map((items: any, index: number) => (
                <div className="my-4 rounded-lg border bg-transparent p-4">
                  <p className="text-lg font-bold">{items.name}</p>
                  <div
                    className="mt-4 flex items-center gap-x-base"
                    key={index}
                  >
                    <InputField
                      label="Icon"
                      placeholder="Icon Link"
                      {...items.register1}
                    />
                  </div>
                  <div
                    className="mt-4 flex items-center gap-x-base"
                    key={index}
                  >
                    <InputField
                      label={items.featureTitle}
                      placeholder="Title"
                      {...items.register2}
                    />
                  </div>
                  <div className="mt-4">
                    <TextArea
                      label={items.featureDesc}
                      placeholder="Description"
                      {...items.register3}
                    />
                  </div>
                </div>
              ))}
              <div className="mt-4 items-center gap-x-base">
                <TextArea
                  label="Care Instructions"
                  placeholder="Description care instructions"
                  {...register("careinstructions")}
                />
              </div>
              <div className="my-4 rounded-lg border bg-transparent p-4">
                <p className="text-lg font-bold">Size Guide</p>
                <div className="mt-4">
                  <TextArea
                    label="Width, in"
                    placeholder="Width size [XS, S, M, L, XL, 2XL]"
                    {...register("widthSize")}
                  />
                </div>
                <div className="mt-4">
                  <TextArea
                    label="Height, in"
                    placeholder="Height size [XS, S, M, L, XL, 2XL]"
                    {...register("heightSize")}
                  />
                </div>
              </div>
            </div>
            <div className="mt-xlarge w-full">
              <Metadata setMetadata={setMetadata} metadata={metadata} />
            </div>
          </Modal.Content>
          <Modal.Footer>
            <div className="flex w-full items-center justify-end gap-x-xsmall">
              <Button
                variant="secondary"
                size="small"
                type="button"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="small"
                loading={isEdit ? updating : creating}
              >
                {`${isEdit ? "Save" : "Publish"} collection`}
              </Button>
            </div>
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  )
}

export default CollectionModal
