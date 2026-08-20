import BaseModal from "~/components/modals/Base";
import { createStore } from "solid-js/store";
import { AssetEntries } from "~/core/types";
import { For } from "solid-js";
import mime from "mime/lite";
import Icon from "~/components/Icon";

function isImageAsset(path: string) {
  const mt = mime.getType(path)
  return mt ? mt.startsWith("image/") : false
}

export default function CreateImageModal(props: {
  onClose: (content?: string) => any,
  assets: () => AssetEntries,
}) {
  const [form, setForm] = createStore({
    alt: "",
    src: "",
  })

  return (
    <BaseModal title="Insert Image">
      <div class="shadow-glass rounded-box p-4 my-2">
        <span class="text-md font-bold">Stored Image Assets</span>
        <ul class="list gap-2">
          <For each={Object.values(props.assets()).filter(v => isImageAsset(v.fullSlug || ""))}>
            {asset => <li class="list-row bg-base-100 rounded-box shadow-glass items-center">
              <div><Icon name="file" /></div>
              <div class="content-center">{asset.fullSlug?.split("/").at(-1)}</div>
              <div><button
                class="btn"
                onClick={() => setForm({ src: asset.fullSlug?.split("/").at(-1) })}
              >Use</button></div>
            </li>}
          </For>
        </ul>
      </div>

      <form onSubmit={(ev) => {
        ev.preventDefault()
        props.onClose(`![${form.alt}](${form.src})`)
      }}>
        <label class="form-control">
          <span class="label">Alt Text</span>
          <input
            value={form.alt}
            onInput={(ev) => setForm({ alt: ev.currentTarget.value })}
            class="input input-bordered w-full"
            type="text"
            placeholder="e.g. A Grey Cat"
          />
        </label>
        <label class="form-control">
          <span class="label">Source</span>
          <input
            value={form.src}
            onInput={(ev) => setForm({ src: ev.currentTarget.value })}
            class="input input-bordered w-full"
            type="text"
            placeholder="e.g. https://example.com/grey-cat.jpg"
            required
          />
        </label>
        <div class="modal-action">
          <button class="btn btn-primary" type="submit">Insert</button>
          <button onclick={() => props.onClose()} class="btn" type="button">Cancel</button>
        </div>
      </form>
    </BaseModal>
  )
}
