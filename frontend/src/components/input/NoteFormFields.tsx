import { SetStoreFunction } from "solid-js/store";
import { toMachineSlug, toMachineSlugWithSuffix, toPathSlug, toSlug } from "~/core/helpers";
import StorageHandler from "~/core/storage";

interface Fields {
  title: string,
  slug: string,
  parentSlug: string,
}

export default function NoteFormFields(props: {
  fields: Fields,
  setFields: SetStoreFunction<Fields>,
}) {
  const [randomSuffixEnabled, setRandomSuffixEnabled] = StorageHandler.createSettingSignalJSON<boolean>("randomSlugSuffix", true)

  return (
    <>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Title</legend>
        <input
          class="input validator"
          value={props.fields.title}
          onInput={(ev) => props.setFields({
            title: ev.currentTarget.value,
            slug: randomSuffixEnabled()
              ? toMachineSlugWithSuffix(ev.currentTarget.value)
              : toMachineSlug(ev.currentTarget.value),
          })}
          name="title"
          type="text"
          placeholder="e.g. My Amazing Note"
          aria-label="title"
          required
        />
        <p class="label">The title of the note, human friendly.</p>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Slug</legend>
        <div class="flex">
          <input
            class="input validator"
            value={props.fields.slug}
            onInput={(ev) => props.setFields({
              slug: toSlug(ev.currentTarget.value),
            })}
            name="slug"
            type="text"
            placeholder="e.g. my-amazing-note"
            aria-label="slug"
            required
          />
        </div>
        <p class="label">URL friendly name, will auto-generate based on title.</p>
        <label class="label">
          <span>Generate Random Suffix</span>
          <input
            class="checkbox"
            type="checkbox"
            checked={randomSuffixEnabled() || false}
            onChange={() => {
              const enabled = !randomSuffixEnabled()
              setRandomSuffixEnabled(enabled)
              if (enabled) {
                props.setFields({ slug: toMachineSlugWithSuffix(props.fields.title) })
              } else {
                props.setFields({ slug: toMachineSlug(props.fields.title) })
              }
            }}
          />
        </label>
      </fieldset>
      <fieldset class="fieldset">
        <legend class="fieldset-legend">Path</legend>
        <span class="input validator">
          <input
            value={props.fields.parentSlug}
            onInput={(ev) => props.setFields({
              parentSlug: toPathSlug(ev.currentTarget.value),
            })}
            name="parentSlug"
            type="text"
            placeholder="e.g. some/path"
            aria-label="path"
          />
          <span class="label overflow-x-auto max-w-64">{`/${props.fields.slug}`}</span>
        </span>
        <p class="label">Where note will be created, leave blank for placing at top level.</p>
      </fieldset>
    </>
  )
}
