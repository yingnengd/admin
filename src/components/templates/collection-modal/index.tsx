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
  linkImage: unknown
  feature1: unknown
  feature2: unknown
  feature3: unknown
  feature4: unknown
  feature5: unknown
  feature6: unknown
  featureDesc1: unknown
  featureDesc2: unknown
  featureDesc3: unknown
  featureDesc4: unknown
  featureDesc5: unknown
  featureDesc6: unknown
  careinstructions: unknown
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
      register: { ...register("feature1") },
      register2: { ...register("featureDesc1") },
    },
    {
      name: "Key Feature No.2",
      featureTitle: "Title",
      featureDesc: "Description",
      register: { ...register("feature2") },
      register2: { ...register("featureDesc2") },
    },
    {
      name: "Key Feature No.3",
      featureTitle: "Title",
      featureDesc: "Description",
      register: { ...register("feature3") },
      register2: { ...register("featureDesc3") },
    },
    {
      name: "Key Feature No.4",
      featureTitle: "Title",
      featureDesc: "Description",
      register: { ...register("feature4") },
      register2: { ...register("featureDesc4") },
    },
    {
      name: "Key Feature No.5",
      featureTitle: "Title",
      featureDesc: "Description",
      register: { ...register("feature5") },
      register2: { ...register("featureDesc5") },
    },
    {
      name: "Key Feature No.6",
      featureTitle: "Title",
      featureDesc: "Description",
      register: { ...register("feature6") },
      register2: { ...register("featureDesc6") },
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
        linkImage: collection.metadata.linkImage,
        feature1: collection.metadata.feature1,
        feature2: collection.metadata.feature2,
        feature3: collection.metadata.feature3,
        feature4: collection.metadata.feature4,
        feature5: collection.metadata.feature5,
        feature6: collection.metadata.feature6,
        featureDesc1: collection.metadata.featureDesc1,
        featureDesc2: collection.metadata.featureDesc2,
        featureDesc3: collection.metadata.featureDesc3,
        featureDesc4: collection.metadata.featureDesc4,
        featureDesc5: collection.metadata.featureDesc5,
        featureDesc6: collection.metadata.featureDesc6,
        careinstructions: collection.metadata.careinstructions,
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
    if (isEdit) {
      const updateData = metadata.reduce((acc, next) => {
        return {
          ...acc,
          [next.key]: next.value,
        }
      }, {})
      ;(updateData["about"] = data.about),
        (updateData["linkImage"] = data.linkImage),
        (updateData["feature1"] = data.feature1),
        (updateData["feature2"] = data.feature2),
        (updateData["feature3"] = data.feature3),
        (updateData["feature4"] = data.feature4),
        (updateData["feature5"] = data.feature5),
        (updateData["feature6"] = data.feature6),
        (updateData["featureDesc1"] = data.featureDesc1),
        (updateData["featureDesc2"] = data.featureDesc2),
        (updateData["featureDesc3"] = data.featureDesc3),
        (updateData["featureDesc4"] = data.featureDesc4),
        (updateData["featureDesc5"] = data.featureDesc5),
        (updateData["featureDesc6"] = data.featureDesc6),
        (updateData["careinstructions"] = data.careinstructions),
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
      ;(createData["about"] = data.about),
        (createData["linkImage"] = data.linkImage),
        (createData["feature1"] = data.feature1),
        (createData["feature2"] = data.feature2),
        (createData["feature3"] = data.feature3),
        (createData["feature4"] = data.feature4),
        (createData["feature5"] = data.feature5),
        (createData["feature6"] = data.feature6),
        (createData["featureDesc1"] = data.featureDesc1),
        (createData["featureDesc2"] = data.featureDesc2),
        (createData["featureDesc3"] = data.featureDesc3),
        (createData["featureDesc4"] = data.featureDesc4),
        (createData["featureDesc5"] = data.featureDesc5),
        (createData["featureDesc6"] = data.featureDesc6),
        (createData["careinstructions"] = data.careinstructions),
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
              <div className="mt-4 flex items-center gap-x-base">
                <InputField
                  label="Image"
                  placeholder="Link Images"
                  {...register("linkImage")}
                />
              </div>
              <div className="mt-4 items-center gap-x-base">
                <TextArea
                  label="About"
                  placeholder="Description Collection"
                  {...register("about")}
                />
              </div>
              {feature.map((items: any, index: number) => (
                <div className="my-4 rounded-lg border bg-transparent p-4">
                  <p className="text-lg font-bold">{items.name}</p>
                  <div
                    className="mt-4 flex items-center gap-x-base"
                    key={index}
                  >
                    <InputField
                      label={items.featureTitle}
                      placeholder="Title"
                      {...items.register}
                    />
                  </div>
                  <div className="mt-4">
                    <TextArea
                      label={items.featureDesc}
                      placeholder="Description"
                      {...items.register2}
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
